!include "MUI2.nsh"
!ifndef VERSION
!define VERSION "1.1.0"
!endif
Name "PayGlass"
OutFile "releases\PayGlass-Setup-${VERSION}.exe"
InstallDir "$LOCALAPPDATA\Programs\PayGlass"
RequestExecutionLevel user
SetCompressor /SOLID lzma
!define MUI_ICON "assets\icon.ico"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_LANGUAGE "English"
Section
SetOutPath "$INSTDIR"
File /r "dist\PayGlass\*"
CreateShortcut "$DESKTOP\PayGlass.lnk" "$INSTDIR\PayGlass.exe"
CreateDirectory "$SMPROGRAMS\PayGlass"
CreateShortcut "$SMPROGRAMS\PayGlass\PayGlass.lnk" "$INSTDIR\PayGlass.exe"
SectionEnd
