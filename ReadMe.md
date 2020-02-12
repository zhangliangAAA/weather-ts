天气查询项目 TS 实战。
1、新建文件，项目初始化
npm init -y
2、安装依赖
npm i ts-node typescript -D
3、配置 TSConfig
如果一个目录下存在一个 tsconfig.json 文件，那么意味着这个目录是 TypeScript 项目的根目录。tsconfig.json 文件中指定了用来编译这个项目的根文件和编译选项。
·不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找 tsconfig.json 文件，逐级向上搜索父目录。
·不带任何输入文件的情况下调用 tsc，且使用命令行参数--project（或-p）指定一个包含 tsconfig.json 文件的目录。
当命令行上指定了输入文件时，tsconfig.json 文件会被忽略。
生成 tsconfig.json
yarn tsc -init
4、配置 TSLint
安装依赖： npm i tslint -D
初始化 tslint.json： yarn tslint --init
