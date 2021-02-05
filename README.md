# Vim-Screenshot
This is a simple plugin that allows you to take snapshots to snippets of your code with a highly customizable format, besides being beautiful, it includes 70+ of pre-set themes.
## Installation
Plug:
``` Vim
Plug 'SergioRibera/vim-screenshot', { 'do', './install.sh OS' }
```
to install you must replace version by the latest version shown in the [releases](https://github.com/SergioRibera/vim-screenshot/releases) page and also replace OS by your operating system, having the options of "linux" and "mac". <br>
The other way would be cloning the repository.
## Instructions
### Variables
|       Name        |       Default Value      |                                                     Description                                                     |
|-------------------|:------------------------:|:-------------------------------------------------------------------------------------------------------------------:|
| g:vimShotSavePath | ~/Images/code-screenshot |                      This is the path to the directory where all generated images will be saved                     |
| g:vimShotTimeOut  |           3000           | (For the moment) Indicates the time in milliseconds to keep open the tab of the binary that renders the screenshot. |
| g:vimShotWidth    |           1024           |                        Refers to the width of the window in which the html will be redirected.                      |
| g:vimShotHeight   |            768           |                       Refers to the height of the window in which the html will be redirected.                      |
### Functions
| Name                         |                                                                                                                                                        Description                                                                                                                                                       |
|------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| TakeScreenShot()             |                                                                                                       This function takes the selected lines and converts them into the image with the settings you have indicated.                                                                                                      |
| OpenFileScreenshotSettings() |                                                                                                              This function opens in a new tab the configuration file in JSON format to customize the image.                                                                                                              |
| OpenPreviewPage()            | This function opens in the binary a test page that allows in a graphical way to configure and see all the themes that the plugin brings, THIS FUNCTION DOES NOT SAVE THE CHANGES; IT SAVES THEM IN THE CLIPBOARD you must paste that in the configuration files calling the previous function and replacing the contents |
### Commands
| Name                          |                                        Description                                       |
|-------------------------------|:----------------------------------------------------------------------------------------:|
| `:TakeScreenShot`             | This command captures the lines selected in visual mode and converts them into an image. |
| `:OpenFileScreenshotSettings` |                This command calls the function `OpenScreenshotSettings()`                |
| `:OpenPreviewPage`            |                   This command calls the `OpenPreviewPage()` function.                   |
### Examples
![Graphical Explication Directory Create](https://raw.githubusercontent.com/SergioRibera/vim-screenshot/main/doc/Vim-Screenshot_112021_182056.png)
<br/><br/>
![Graphical Explication File Create](https://raw.githubusercontent.com/SergioRibera/vim-screenshot/main/doc/Vim-Screenshot_112021_182353.png)
<br/><br/>
![Graphical Explication File Create](https://raw.githubusercontent.com/SergioRibera/vim-screenshot/main/doc/Vim-Screenshot_112021_182518.png)
### Notices
This project is under development and open to ideas or suggestions, I plan to release more customizations for the screenshot system.
If you know of any other method to render the html contained in this project, you can do your tests in the "develop" branch and then add the changes to the main

### **Please report all bugs and problems**
Thanks for install this tool, for see more visit [my web](https://sergioribera.com) (Very soon I will add an app store)
## Donate
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q321D62)<br>
[![](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/SergioRibera)<br>
[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/SergioRibera)<br>
<br>
#### Made with the ❤️ by [SergioRibera](https://sergioribera.com)
