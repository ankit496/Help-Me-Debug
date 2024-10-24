export const fetchData = async () => {
    const response = await fetch("https://emkc.org/api/v2/piston/runtimes", { method: "GET" });
    const res = await response.json()
    return res;
}

export const LANGUAGE_VERSIONS = {
    javascript: "1.32.3",
    typescript: "5.0.3",
    c: "10.2.0",
    cpp: "10.2.0",
    python: "3.10.0",
    java: "15.0.2",
    php: "8.2.3",
};

export const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\t//console.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\t//console.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    cpp: `#include<bits/stdc++.h>
using namespace std;

void greet(string name) {
    cout << "Hello, " << name << "!\\n";
}

int main() {
    greet("Alex");
    return 0;
}
`,
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};