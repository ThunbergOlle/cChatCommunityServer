# ConsoleChatCommunityServer :green_book:
**_"THAT is a very long name"_**

:herb: ConsoleChat :herb:

This is the repository for ConsoleChat community servers & hosting. If you want to become a server owner or a community hoster then this is the place for you! :fire:

---
### Install :memo:
1. Download all the required folders as a zip file.
2. Extract the "master" folder to wherever you like. (Desktop ect.)
3. Goto: /serverFiles/ --> server.json
4. Inside "server.json" change the "ip" to your ip or domain.
5. Open a cmd inside you current folder (Master folder) and type "node server.js" If you are on windows instead open start.bat.

**File: config.json: :blue_book:** 
```
{"username":"server","id":"","mainserver":"81.170.157.146"}
```
---
#### Folders & Files (./) :file_folder:
- modules: All the custom modules that the script needs
- node_modules: Modules downloaded through npm
- serverFiles: Files for the server, configs ect.
- admins.json: IDS for the admins on the community server
- config.json: Config for the server. (Mainip adress ect)
- package-lock.json: Package
- package.json: Package
- README.md: This is what you see now
- server.js: Main server script
- start.bat: Quick launch on windows machines only