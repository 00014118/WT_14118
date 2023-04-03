# TheBlog web application

### This web application allows the user to create and store notes.

To run this web application locally you must follow the steps indicated bellow:

1. Clone this repositary
```bash
git clone https://github.com/00014118/WT_14118.git
```

2. Install dependecies
```bash
cd WT_14118-master
npm install
```

3. Run the application
```bash
node app
```

### Web application dependecies
 - express.js
 - pug.js

### Web application repository on github
[Link to github repo](https://github.com/00014118/WT_14118.git)

```
/WT_14118
    app.js
    package.json
    package-lock.json
    .gitignore

    /data
        archives.json
        notes.json

    /public
        /images
            first.png
            second.png
            third.png
            fourth.png

    /views
        archivedetail.pug
        archives.pug
        create.pug
        detail.pug
        home.pug
        layout.pug
        notes.pug
        edit.pug
```