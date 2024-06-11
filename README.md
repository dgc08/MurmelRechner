# MurmelRechner

## Open the application
https://dgc08.github.io/MurmelRechner/
<hr>

Also make sure to check [Murmel++](https://github.com/dgc08/murmel-plusplus) out!
It contains a faster Bonsai emulator written in C++ if this is too slow for you, and 'murpp' (Yes i know stupid name, it stands for MURmelPlusPLus), which is just an assembly-like abstraction for Bonsai assembly
(It is essentially a kind of programming language for Bonsai/Murmel)
    
## About this fork
I forked this repository from https://github.com/FelixSelter/MurmelRechner
Felix Selter doesn't seem to maintain his repository anymore, and because there are some crucial features missing on his branch, so I made this fork

### Minor changes on this branch
If you want to see a more detailed change log, see [my pull request on the original repository](https://github.com/FelixSelter/MurmelRechner/pull/1). 
The pull request doesn't include [pointers](#pointers) though

- Instruction and register adresses start at 0 instead of 1, which is more compliant to the original Bonsai Computer and other implementations of it
- Added comments starting with ';' (like in real assembly)
- Added options to control the speed of execution (Come on, 1 instruction/s is REALLY SLOW)

### Pointers
I added pointers to the instruction set, which allows for more sophisticated programs (For example my [implementation of Bonsai within Bonsai!](https://github.com/dgc08/murmel-plusplus/blob/master/examples/self_implementation.murpp)) and even stuff like the stack you know from traditional computer architechtures

Pointers essentially let you treat the value in aregisters as an adresses. So if you for example do `inc *1`, instead of increasing 1 the emulator looks up what value is saved in 1 and increase that register instead.

Make sure to only use pointers when you really need to, as I found no other Bonsai emulator / interpreter that does this and it isn't included in the original instruction set.
If you want to use pointers, I'd recommend to not use double pointers. Instructions like `inc ****0` would be valid here, but not even all of my emulators implement nested pointers per se.
You can however still manually dereference nested pointers by copying them around, if you want to target all pointer emulations

My [implementation of Bonsai within Bonsai](https://github.com/dgc08/murmel-plusplus/blob/master/examples/self_implementation.murpp) for example originally worked with nested pointers, but I changed it to use the 'manually dereference' method to allow it to run itself

<br>

Ok, here comes the old part of the README:
## Features
### Simple Interface
![interface](https://github.com/dgc08/MurmelRechner/assets/83305972/5ea747a5-26ef-48a5-a78a-061b8ce71629)

1. ![load](https://user-images.githubusercontent.com/55546882/148061658-23e483ff-5fa8-421a-987d-3a59a4d7e3a9.png)Load your code
2. ![save](https://user-images.githubusercontent.com/55546882/148061734-76d495be-0aa4-4a37-bc56-749a2ee2a5ba.png)Save your code
3. ![flowchart](https://user-images.githubusercontent.com/55546882/148061724-ec8d5d28-309d-4873-9a26-0d2c2632fcfc.png)Generate a flowchart
4. ![format](https://user-images.githubusercontent.com/55546882/148061725-5dd9ab94-e5de-476d-9c81-bc6047056b68.png)Format your code
5. ![add_register](https://user-images.githubusercontent.com/55546882/148061720-bbba2f11-c7d2-4f93-878c-190373f1dd6c.png)Add a register/marble container
6. ![remove_register](https://user-images.githubusercontent.com/55546882/148061732-5c8047ac-b223-43e6-ae67-c945243b703d.png)remove the last register/marble container
7. ![execute](https://user-images.githubusercontent.com/55546882/148061722-fc562d36-48a9-440c-a553-324a4acfd91c.png) Execute your entire code
8. ![nextline](https://user-images.githubusercontent.com/55546882/148061731-c0e88d8e-d888-41f8-b9b3-b62d47ea682d.png)Execute this line. The current position is indicated by this pointer ![pointer](https://user-images.githubusercontent.com/55546882/148063270-7ed1955c-bf79-44c1-9df1-51b103d24272.png)
9. ![Stop](https://user-images.githubusercontent.com/55546882/150634279-bcd4c7cb-d995-4677-8b91-fbf1a7b0f7e3.png) Click this to stop your program if youre stuck in an infinite loop
10. ![increase_speed](https://user-images.githubusercontent.com/55546882/148061720-bbba2f11-c7d2-4f93-878c-190373f1dd6c.png)Increase Execution speed
11. ![decrease_speed](https://user-images.githubusercontent.com/55546882/148061732-5c8047ac-b223-43e6-ae67-c945243b703d.png)Decrease Execution speed
12. ![instruction_speed](https://github.com/dgc08/MurmelRechner/assets/83305972/abcc7713-6753-4f9d-8079-d02986e09a5a) Click the execution speed label to reset it to 1
13. ![collaboration](https://user-images.githubusercontent.com/55546882/148063904-1a50f737-1c97-4c0d-9cb0-a13fb65e0db7.png)Enable the collaboration mode
14. ![fullscreen](https://user-images.githubusercontent.com/55546882/148063906-0b35c442-9ec7-43fc-bda9-a5f57d8bd66f.png)Enter the fullscreen mode
15. ![id](https://user-images.githubusercontent.com/55546882/148065155-0ce3572b-c0e5-4694-99be-06e547b85215.png) Click the id to get a link so you can invite others
### Syntax highlighting
![syntax](https://user-images.githubusercontent.com/55546882/148062386-b810ba2e-40a4-4183-a949-d1f27a3521c5.png)

### Live visual feedback
![feedback](https://user-images.githubusercontent.com/55546882/148062562-cfb6c7ba-ea6f-43ea-bf45-002cdf643ed2.png)
### Automatic code formatting
![formatting1](https://user-images.githubusercontent.com/55546882/148062899-58327ba5-17ee-4eab-8a51-576d6327473f.png)
<br>Becomes<br>
![formatting2](https://user-images.githubusercontent.com/55546882/148062902-92a00658-3b8e-4580-90b5-26a7eeee28e9.png)

### Generate Flowchart
You can automatically generate a flowchart from the assembly
![flowchart(1)](https://user-images.githubusercontent.com/55546882/148064491-259cd64b-f02f-435f-8552-195021cc0c2c.png)
### Collaborative editinG
Enable the collaboration mode to work with others at the same time

### Example multiplication code
```
; As long as the multiplier is not 0, continue with the program
tst 0
--jmp 3
hlt

; Decrement the multiplier, done once per iteration
dec 0

; Decrement the multiplicand until it's 0  and add its content onto registers 2 and 3
tst 1
--jmp 7
jmp 11
dec 1
inc 2
inc 3
jmp 4

; Move the multiplicand, now stored in register 2, back to register 1
tst 2
--jmp 15
jmp 0
; move complete, go to next iteration
jmp 0
dec 2
inc 1
jmp 11
```
