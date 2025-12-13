@echo off
REM Script to delete the misspelled enum file

echo Deleting misspelled file LIstingStatus.java...
del /F "src\main\java\com\example\financial\enums\LIstingStatus.java"

if %ERRORLEVEL% == 0 (
    echo File deleted successfully!
) else (
    echo Error deleting file. Error code: %ERRORLEVEL%
)

pause
