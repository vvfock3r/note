@echo off
cd /d D:\person\note
git add *
git commit -m "更新"
git -c http.proxy=127.0.0.1:7890 push
pause