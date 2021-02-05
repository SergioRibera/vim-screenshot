# Vim-Screenshot
This is a simple plugin that allows you to take snapshots to snippets of your code with a highly customizable format, besides being beautiful, it includes 70+ of pre-set themes.
## Requirements
To be able to use this extension, it is essential that you have the following installed:
- NodeJs
- npm
## Installation
Plug:
``` Vim
Plug 'SergioRibera/vim-screenshot', { 'do', 'cd Renderizer && npm install' }
```
The other way would be cloning the repository.
## Instructions
### Variables
|       Name        |       Default Value      |                                                     Description                                                     |
|-------------------|:------------------------:|:-------------------------------------------------------------------------------------------------------------------:|
| g:vimShotSavePath | ~/Images/code-screenshot |                      This is the path to the directory where all generated images will be saved                     |
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

### **Please report all bugs and problems**
Thanks for install this tool, for see more visit [my web](https://sergioribera.com) (Very soon I will add an app store)
## Donate
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q321D62)<br>
[![](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/SergioRibera)<br>
[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/SergioRibera)<br>
<br>
#### Made with the ❤️ by [SergioRibera](https://sergioribera.com)
