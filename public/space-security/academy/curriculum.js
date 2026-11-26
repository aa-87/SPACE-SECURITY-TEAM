/* Original beginner curriculum. Guided traces, not an interpreter. */
(function(root){'use strict';const lessons=[
  {
    "title": "Your first instruction",
    "topic": "WRITE",
    "minutes": 5,
    "goal": "Display a message and start a new line.",
    "intro": "A program is a set of instructions. Start with one instruction: WRITE tells the computer to display something. Text inside quotation marks is a literal value. The exclamation mark in a WRITE argument list starts a new line.",
    "code": [
      "WRITE \"Hello, world!\",!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "Hello, world!\n",
        "memory": {},
        "explain": "The message is displayed, followed by a newline."
      }
    ],
    "question": "What does ! do in this WRITE instruction?",
    "choices": [
      "Ends the program",
      "Starts a new line",
      "Adds an exclamation mark to the message"
    ],
    "answer": 1,
    "why": "Outside the quoted text, ! is a WRITE formatting control. Inside quotes it is ordinary text.",
    "practice": "Change the message using the guided message builder.",
    "task": "Display a greeting of your choice.",
    "reference": "commands.html#write"
  },
  {
    "title": "Values and quotation marks",
    "topic": "Values",
    "minutes": 7,
    "goal": "Distinguish literal text and numeric expressions.",
    "intro": "Information may be a number or a sequence of characters called a string. Quotation marks enclose literal text. MUMPS values are not permanently declared as numeric or string types; how a value is used matters. In WRITE, commas separate items.",
    "code": [
      "WRITE \"Number: \",7,!",
      "WRITE \"2+3\",!",
      "WRITE 2+3,!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "Number: 7\n",
        "memory": {},
        "explain": "Two items are written next to each other."
      },
      {
        "line": 1,
        "output": "Number: 7\n2+3\n",
        "memory": {},
        "explain": "Quoted characters are displayed literally."
      },
      {
        "line": 2,
        "output": "Number: 7\n2+3\n5\n",
        "memory": {},
        "explain": "Without quotes, this arithmetic expression is evaluated."
      }
    ],
    "question": "What does WRITE \"2+3\",! display?",
    "choices": [
      "5",
      "2+3",
      "23"
    ],
    "answer": 1,
    "why": "Quotation marks make the expression literal text.",
    "practice": "Predict each line of output before stepping.",
    "task": "Write a number and a short label on the same line.",
    "reference": "langfeat.html"
  },
  {
    "title": "Remember a value",
    "topic": "SET",
    "minutes": 8,
    "goal": "Store and retrieve a value using a variable.",
    "intro": "A variable is a named place for a value. SET assigns a value to a variable. WRITE can retrieve it. Names are case-sensitive: name and Name are different. Define a variable before trying to retrieve its value.",
    "code": [
      "SET name=\"Alex\"",
      "SET age=21",
      "WRITE name,!,age,!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "",
        "memory": {
          "name": "Alex"
        },
        "explain": "SET creates name with the value Alex."
      },
      {
        "line": 1,
        "output": "",
        "memory": {
          "name": "Alex",
          "age": 21
        },
        "explain": "A second variable stores 21."
      },
      {
        "line": 2,
        "output": "Alex\n21\n",
        "memory": {
          "name": "Alex",
          "age": 21
        },
        "explain": "WRITE retrieves the two stored values."
      }
    ],
    "question": "Which instruction stores the number 8 in count?",
    "choices": [
      "WRITE count=8",
      "SET count=8",
      "SET 8=count"
    ],
    "answer": 1,
    "why": "The variable belongs on the left of the assignment.",
    "practice": "Step through the example and watch the memory diagram.",
    "task": "Store your favorite number in a variable and display it.",
    "reference": "commands.html#set"
  },
  {
    "title": "Change information",
    "topic": "Assignment",
    "minutes": 8,
    "goal": "Update a variable using its previous value.",
    "intro": "SET can replace a variable's value. When the right side refers to the same variable, the expression is evaluated before assignment. The underscore operator joins text values without inserting spaces automatically.",
    "code": [
      "SET count=4",
      "SET count=count+1",
      "SET message=\"Total: \"_count",
      "WRITE message,!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "",
        "memory": {
          "count": 4
        },
        "explain": "Initialize the counter."
      },
      {
        "line": 1,
        "output": "",
        "memory": {
          "count": 5
        },
        "explain": "Read the old value, add one, then store the result."
      },
      {
        "line": 2,
        "output": "",
        "memory": {
          "count": 5,
          "message": "Total: 5"
        },
        "explain": "The underscore joins the label and the value."
      },
      {
        "line": 3,
        "output": "Total: 5\n",
        "memory": {
          "count": 5,
          "message": "Total: 5"
        },
        "explain": "Display the combined message."
      }
    ],
    "question": "If count is 4, what is count after SET count=count+1?",
    "choices": [
      "4",
      "41",
      "5"
    ],
    "answer": 2,
    "why": "The expression on the right is evaluated first.",
    "practice": "Watch which variable changes at each step.",
    "task": "Start a counter at 10 and add 2.",
    "reference": "langfeat.html"
  },
  {
    "title": "Calculate with expressions",
    "topic": "Arithmetic",
    "minutes": 10,
    "goal": "Understand left-to-right evaluation and parentheses.",
    "intro": "An expression produces a value. In MUMPS, binary operators are evaluated left to right unless parentheses group part of the expression. Use parentheses to make the intended order explicit. Spaces are meaningful command delimiters, so do not insert spaces between these expression tokens.",
    "code": [
      "WRITE 2+3*4,!",
      "WRITE 2+(3*4),!",
      "WRITE (10-2)/4,!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "20\n",
        "memory": {},
        "explain": "2+3 becomes 5, then 5*4 becomes 20."
      },
      {
        "line": 1,
        "output": "20\n14\n",
        "memory": {},
        "explain": "The parenthesized multiplication produces 12 first."
      },
      {
        "line": 2,
        "output": "20\n14\n2\n",
        "memory": {},
        "explain": "The grouped subtraction produces 8, then division produces 2."
      }
    ],
    "question": "What does WRITE 2+3*4,! display?",
    "choices": [
      "14",
      "20",
      "24"
    ],
    "answer": 1,
    "why": "The ungrouped expression is evaluated left to right.",
    "practice": "Compare the first two lines before running the guided trace.",
    "task": "Use parentheses to make 2+3*4 evaluate to 14.",
    "reference": "langfeat.html"
  },
  {
    "title": "Receive information",
    "topic": "READ",
    "minutes": 10,
    "goal": "Accept a message from the person using the program.",
    "intro": "READ retrieves input from the current device. On a terminal, it can wait for a line typed by a person. A quoted READ argument can display a prompt. This guided example uses a supplied input value rather than accessing a real terminal.",
    "code": [
      "READ \"Your name: \",name",
      "WRITE !,\"Hello, \",name,!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "Your name: ",
        "memory": {
          "name": "Alex"
        },
        "explain": "The prompt is displayed and the example input Alex is stored."
      },
      {
        "line": 1,
        "output": "Your name: \nHello, Alex\n",
        "memory": {
          "name": "Alex"
        },
        "explain": "The program writes a greeting using the stored input."
      }
    ],
    "question": "Which command waits for a value to be entered?",
    "choices": [
      "READ",
      "WRITE",
      "SET"
    ],
    "answer": 0,
    "why": "READ accepts input from the current device.",
    "practice": "The simulated input is Alex; on a real terminal you type a name.",
    "task": "Ask for a word, then display it.",
    "reference": "commands.html#read"
  },
  {
    "title": "Ask a question",
    "topic": "Comparisons",
    "minutes": 9,
    "goal": "Evaluate comparisons that produce true or false.",
    "intro": "A comparison produces 1 for true or 0 for false. The equals sign compares values when used inside an expression. Greater-than and less-than compare numeric values. Parentheses make compound expressions clear.",
    "code": [
      "SET score=7",
      "WRITE score=7,!",
      "WRITE score>10,!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "",
        "memory": {
          "score": 7
        },
        "explain": "Store the score."
      },
      {
        "line": 1,
        "output": "1\n",
        "memory": {
          "score": 7
        },
        "explain": "The comparison is true."
      },
      {
        "line": 2,
        "output": "1\n0\n",
        "memory": {
          "score": 7
        },
        "explain": "7 is not greater than 10."
      }
    ],
    "question": "What does WRITE 7>10,! display?",
    "choices": [
      "1",
      "7",
      "0"
    ],
    "answer": 2,
    "why": "The comparison is false, so its value is zero.",
    "practice": "Predict each comparison before advancing.",
    "task": "Compare two numbers and display the result.",
    "reference": "langfeat.html"
  },
  {
    "title": "Make a decision",
    "topic": "IF / ELSE",
    "minutes": 12,
    "goal": "Choose instructions based on a condition.",
    "intro": "IF tests a condition. When false, it skips the remainder of that physical line. ELSE uses the current $TEST value and can select the alternative on the next line. Notice the two spaces after argumentless ELSE before WRITE. Keep these lines together when practicing.",
    "code": [
      "SET score=7",
      "IF score>10 WRITE \"Above ten\",!",
      "ELSE  WRITE \"Ten or below\",!",
      "WRITE \"Done\",!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "",
        "memory": {
          "score": 7
        },
        "explain": "Set the example score."
      },
      {
        "line": 1,
        "output": "",
        "memory": {
          "score": 7,
          "$TEST": 0
        },
        "explain": "The IF test is false, so WRITE on this line is skipped."
      },
      {
        "line": 2,
        "output": "Ten or below\n",
        "memory": {
          "score": 7,
          "$TEST": 0
        },
        "explain": "ELSE sees the false test and executes its WRITE."
      },
      {
        "line": 3,
        "output": "Ten or below\nDone\n",
        "memory": {
          "score": 7,
          "$TEST": 0
        },
        "explain": "Execution continues with the next line."
      }
    ],
    "question": "What happens to WRITE on the same line when IF is false?",
    "choices": [
      "It runs twice",
      "It is skipped",
      "The whole routine stops"
    ],
    "answer": 1,
    "why": "A false IF skips the rest of its own line, not the entire routine.",
    "practice": "Step through the false branch and the following line.",
    "task": "Use IF and ELSE to choose between two messages.",
    "reference": "commands.html#if"
  },
  {
    "title": "Repeat an instruction",
    "topic": "FOR",
    "minutes": 10,
    "goal": "Use a bounded loop and a counter.",
    "intro": "A loop repeats instructions. FOR i=1:1:3 starts i at 1, increases it by 1 and repeats through 3. The commands after FOR on that line form the loop body. After the loop finishes, execution continues with the next line.",
    "code": [
      "FOR i=1:1:3 WRITE i,!",
      "WRITE \"Finished\",!"
    ],
    "frames": [
      {
        "line": 0,
        "output": "1\n",
        "memory": {
          "i": 1
        },
        "explain": "First iteration: i is 1."
      },
      {
        "line": 0,
        "output": "1\n2\n",
        "memory": {
          "i": 2
        },
        "explain": "Second iteration: i is 2."
      },
      {
        "line": 0,
        "output": "1\n2\n3\n",
        "memory": {
          "i": 3
        },
        "explain": "Third iteration: i is 3."
      },
      {
        "line": 1,
        "output": "1\n2\n3\nFinished\n",
        "memory": {},
        "explain": "The loop ends; the next line executes. The counter is omitted from this final diagram."
      }
    ],
    "question": "How many times does FOR i=1:1:3 WRITE i,! write a number?",
    "choices": [
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "why": "The inclusive range visits 1, 2 and 3.",
    "practice": "Notice that the same line is highlighted three times.",
    "task": "Write a bounded loop that displays 1 through 5.",
    "reference": "commands.html#for"
  },
  {
    "title": "Your first saved routine",
    "topic": "Routine / QUIT",
    "minutes": 12,
    "goal": "Save a complete routine and run it with YottaDB.",
    "intro": "A routine is a named source file containing lines of MUMPS instructions. Save this example as HELLO.m. The label HELLO begins in column one; the command lines begin with a space. QUIT returns from the routine. The browser trace is a demonstration; run the saved routine using a configured YottaDB environment for real execution.",
    "code": [
      "HELLO ; My first routine",
      " SET name=\"Alex\"",
      " WRITE \"Hello, \",name,!",
      " QUIT"
    ],
    "frames": [
      {
        "line": 0,
        "output": "",
        "memory": {},
        "explain": "The label names the entry point. The semicolon begins a comment."
      },
      {
        "line": 1,
        "output": "",
        "memory": {
          "name": "Alex"
        },
        "explain": "Store the name."
      },
      {
        "line": 2,
        "output": "Hello, Alex\n",
        "memory": {
          "name": "Alex"
        },
        "explain": "Write the greeting."
      },
      {
        "line": 3,
        "output": "Hello, Alex\n",
        "memory": {
          "name": "Alex"
        },
        "explain": "QUIT returns control to the caller."
      }
    ],
    "question": "Where does the label HELLO begin in the source file?",
    "choices": [
      "Column one",
      "After two spaces",
      "Inside quotation marks"
    ],
    "answer": 0,
    "why": "Routine labels begin in column one; unlabeled command lines start with whitespace.",
    "practice": "Save the example as HELLO.m in a configured routine directory. Run yottadb -run ^HELLO from the shell.",
    "task": "Create a routine that greets you by name.",
    "reference": "devcycle.html"
  }
];lessons.forEach((l,i)=>l.id=String(i+1).padStart(2,'0'));if(typeof module==='object'&&module.exports)module.exports=lessons;else root.SSTLessons=lessons;})(typeof window!=='undefined'?window:globalThis);
