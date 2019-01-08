rmdir /s /q Binary\win32

:: .\venv\Scripts\activate.bat
pyinstaller --clean --distpath ./Binary/win32 MusicBox-win32.spec
rmdir /s /q Build