"
"
"   ---------------------------- Verify vars ----------------------------
"
"

"if !exists("g:vimShotWidth")
	"let g:vimShotWidth = 1024
"endif
"if !exists("g:vimShotHeight")
	"let g:vimShotHeight = 768
"endif

if exists('g:vimShotSavePath')
    let g:vimShotSavePath = fnamemodify(g:vimShotSavePath, ':p')
else
    let g:vimShotSavePath = fnamemodify('~/Images/code-screenshot/', ':p')
endif

let s:vimShotConfigPath = expand('<sfile>:p:h:h')
let s:plugin_path = fnamemodify(expand('<sfile>:p:h') . '/../', ':p')

let s:configDefault = {
            \ "shadowEnable": v:true,
            \ "showLineNumbers": v:true,
            \ "backgroundTransparent": v:true,
            \ "theme": "default",
            \ "backgroundColor": "#c6d1fb",
            \ "borderRadius": 5,
            \ "margins": {
                \ "top": 40,
                \ "left": 40,
                \ "bottom": 40,
                \ "right": 40
                \ }
            \ }


"
"   ____________________________ Private Functions ____________________________
"
function! s:ToJson(input)
    let json = ''
    if type(a:input) == type({})
        let json .= "{\n"
        let di =  0
        for key in keys(a:input)
            let di += 1
            let json .= '               "'.escape(key, '"').'":'
            let json .= s:ToJson(a:input[key])
            let json .= di<len(a:input)? ",\n" : "\n"
        endfor
        let json .= "}\n"
    elseif type(a:input) == type([])
        let json .= "[\n"
        let li = 0
        for e in a:input
            let li += 1
            let json .= s:ToJson(e)
            if li<len(a:input)
                let json .= ",\n"
            endif
        endfor
        let json .=  "]\n"

    else
        if type(a:input) == type(v:t_bool) || type(a:input) == type(v:t_number)
            let json .= escape(a:input, '"')
        else
            let json .= '"'.escape(a:input, '"').'"'
        endif
    endif
    return json
endfunction
function! s:get_visual_selection()
    let [line_start, column_start] = getpos("'<")[1:2]
    let [line_end, column_end] = getpos("'>")[1:2]
    let lines = getline(line_start, line_end)
    if len(lines) == 0
        return ''
    endif
    let lines[-1] = lines[-1][: column_end - (&selection == 'inclusive' ? 1 : 2)]
    let lines[0] = lines[0][column_start - 1:]
    "return join(lines, "\x0a")
    return lines
endfunction
function! s:separator()
  return !exists('+shellslash') || &shellslash ? '/' : '\'
endfunction
function! s:encodeHtml(value)
    "let l:value = substitute(a:value, "&", "&amp;", "")
    "let l:value = substitute(l:value, "<", "&lt;", "")
    "let l:value = substitute(l:value, ">", "&gt;", "")
    "let l:value = substitute(l:value, '"', "&quot;", "")
    "return substitute(a:value, "'", "&#039;", "")
    return a:value
endfunction
function! s:configFilePath()
    let l:filePath = s:separator() . "vimshot-config.json"
    return fnamemodify(s:vimShotConfigPath . l:filePath, ':p')
endfunction
function! s:get_excecute_path()
    return 'node ' . s:plugin_path . 'Renderizer/index.js'
endfunction

function! s:convertJsonToJs()
    let l:content = []
    call add(l:content, 'const data=')
    for line in readfile(s:configFilePath())
        call add(l:content, line)
    endfor
    if writefile([], s:plugin_path.'extra/plug/data.js') == 0
        if writefile(l:content, s:plugin_path.'extra/plug/data.js') != 0
            echoerr "Can't generate correct files"
        endif
    endif
    "silent execute "!".s:get_excecute_path() shellescape("genjs") shellescape(s:configFilePath()) shellescape(s:plugin_path.'extra/plug/data.js')
endfunction
function! s:verifyFile()
    if !isdirectory(g:vimShotSavePath)
        call mkdir(g:vimShotSavePath, "p")
    endif
    if !filereadable(s:configFilePath())
        execute 'tabnew ' . s:configFilePath()
        put! = s:ToJson(s:configDefault)
        set filetype=json
        w!
        echomsg "Please Save and restart Vim"
        return
    endif
endfunction

"
"   ____________________________ Public Functions ____________________________
"
function! TakeScreenShot()
    let l:content = s:get_visual_selection()
    let l:contentHtml = []
    if len(l:content) > 1
        for line in readfile(s:plugin_path . 'extra/plug/template.html')
            if stridx(line, "#CODE#") >= 0
                call add(l:contentHtml, '<pre id="code-container"><code>' . s:encodeHtml(l:content[0]) )
                for i in l:content[1:len(l:content)-2]
                    call add(l:contentHtml, s:encodeHtml(i) )
                endfor
                call add(l:contentHtml, s:encodeHtml(l:content[len(l:content)-1]) . '</code></pre>')
            else
                call add(l:contentHtml, line)
            endif
        endfor
    else
        call add(l:contentHtml, '<pre id="code-container"><code>')
        for line in readfile(s:plugin_path . 'extra/plug/template.html')
            if stridx(line, "#CODE#") >= 0
                call add(l:contentHtml, '<pre id="code-container"><code>')
                for i in l:content
                    call add(l:contentHtml, s:encodeHtml(i) )
                endfor
                call add(l:contentHtml, '</code></pre>')
            else
                call add(l:contentHtml, line)
            endif
        endfor
        call add(l:contentHtml, '</code></pre>')
    endif
    if writefile(l:contentHtml, s:plugin_path.'extra/plug/index.html', "b") == 0
        silent execute "!".s:get_excecute_path() shellescape("screenshot") shellescape(s:plugin_path.'extra/plug/index.html') shellescape(g:vimShotSavePath)
    else
        echoerr "Could can't process ScreenShot"
    endif
endfunction

function! OpenFileScreenshotSettings()
    call s:verifyFile()
    execute "tabnew ".s:configFilePath()
endfunction

function! OpenPreviewPage()
    silent execute "!".s:get_excecute_path() shellescape(s:plugin_path.'extra/prev/index.html')
endfunction

"
" ____________________________ Commands ____________________________
"

autocmd! vimenter * call s:verifyFile()
autocmd! BufWritePost vimshot-config.json call s:convertJsonToJs()

if !exists(":TakeScreenShot")
    command -range=% -bar TakeScreenShot :call TakeScreenShot()
endif
if !exists(":OpenScreenshotSettings")
    command OpenScreenshotSettings :call OpenFileScreenshotSettings()
endif
if !exists(":OpenScreenShotVisualPreview")
    command OpenScreenShotVisualPreview :call OpenPreviewPage()
endif
