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
    "reference": "commands.html#write",
    "id": "01"
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
    "reference": "langfeat.html",
    "id": "02"
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
    "reference": "commands.html#set",
    "id": "03"
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
    "reference": "langfeat.html",
    "id": "04"
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
    "reference": "langfeat.html",
    "id": "05",
    "lab": "expressions"
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
    "reference": "commands.html#read",
    "id": "06"
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
    "reference": "langfeat.html",
    "id": "07",
    "lab": "flow"
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
    "reference": "commands.html#if",
    "id": "08",
    "lab": "flow"
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
    "reference": "commands.html#for",
    "id": "09",
    "lab": "flow"
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
    "reference": "devcycle.html",
    "id": "10"
  },
  {
    "title": "Give information an address",
    "topic": "Subscripts",
    "minutes": 10,
    "goal": "Store values under named keys.",
    "intro": "A subscript is a key inside parentheses. Instead of creating a different variable for every person, use one variable with different subscripts. Each address can hold its own value.",
    "code": [
      "SET city(\"Alex\")=\"Boston\"",
      "SET city(\"Sam\")=\"Chicago\"",
      "WRITE city(\"Sam\"),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "city(\"Alex\")": "Boston"
        },
        "output": "",
        "explain": "Create the Alex node."
      },
      {
        "line": 1,
        "memory": {
          "city(\"Alex\")": "Boston",
          "city(\"Sam\")": "Chicago"
        },
        "output": "",
        "explain": "The second address is independent."
      },
      {
        "line": 2,
        "memory": {
          "city(\"Alex\")": "Boston",
          "city(\"Sam\")": "Chicago"
        },
        "output": "Chicago\n",
        "explain": "Retrieve exactly the address named."
      }
    ],
    "question": "What does city(\"Sam\") retrieve?",
    "choices": [
      "Boston",
      "Chicago",
      "Both cities"
    ],
    "answer": 1,
    "why": "The subscript selects a specific node.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Create two names and their favorite colors.",
    "lab": "trees",
    "reference": "langfeat.html",
    "id": "11"
  },
  {
    "title": "Build a tree of information",
    "topic": "Multiple subscripts",
    "minutes": 10,
    "goal": "Organize related facts in branches.",
    "intro": "Multiple subscripts describe a path through a tree. A parent node can have descendants without having a value itself; it can also hold a value and descendants at the same time.",
    "code": [
      "SET contact(\"Alex\")=\"Friend\"",
      "SET contact(\"Alex\",\"city\")=\"Boston\"",
      "WRITE contact(\"Alex\"),!,contact(\"Alex\",\"city\"),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "contact(\"Alex\")": "Friend"
        },
        "output": "",
        "explain": "Store a value at the person node."
      },
      {
        "line": 1,
        "memory": {
          "contact(\"Alex\")": "Friend",
          "contact(\"Alex\",\"city\")": "Boston"
        },
        "output": "",
        "explain": "Add a child without replacing its parent."
      },
      {
        "line": 2,
        "memory": {
          "contact(\"Alex\")": "Friend",
          "contact(\"Alex\",\"city\")": "Boston"
        },
        "output": "Friend\nBoston\n",
        "explain": "Both addresses contain values."
      }
    ],
    "question": "Can a node contain both a value and children?",
    "choices": [
      "Yes",
      "No",
      "Only in a global"
    ],
    "answer": 0,
    "why": "A value and descendants can coexist.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Add a second field under Alex.",
    "lab": "trees",
    "reference": "langfeat.html",
    "id": "12"
  },
  {
    "title": "Leave room for missing information",
    "topic": "Sparse trees",
    "minutes": 10,
    "goal": "Understand that unused addresses need not exist.",
    "intro": "A sparse tree contains only the information that has been created. Numeric subscripts do not require every intervening number to exist. An undefined node is not automatically zero or an empty string.",
    "code": [
      "SET item(1)=\"Book\"",
      "SET item(100)=\"Pen\"",
      "WRITE $DATA(item(2)),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "item(1)": "Book"
        },
        "output": "",
        "explain": "Create address 1."
      },
      {
        "line": 1,
        "memory": {
          "item(1)": "Book",
          "item(100)": "Pen"
        },
        "output": "",
        "explain": "Address 100 does not create 2 through 99."
      },
      {
        "line": 2,
        "memory": {
          "item(1)": "Book",
          "item(100)": "Pen"
        },
        "output": "0\n",
        "explain": "The address 2 is undefined."
      }
    ],
    "question": "Does setting item(100) create item(2)?",
    "choices": [
      "Yes",
      "No",
      "Only when the value is text"
    ],
    "answer": 1,
    "why": "Sparse storage does not fill gaps.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Create two distant numeric subscripts.",
    "lab": "trees",
    "reference": "functions.html",
    "id": "13"
  },
  {
    "title": "Remove a branch",
    "topic": "KILL",
    "minutes": 10,
    "goal": "Delete a node and its descendants.",
    "intro": "KILL removes a named variable or branch, including descendants. Other branches are unaffected. Use explicit local targets while learning; never experiment with deletion in a production database.",
    "code": [
      "SET contact(\"Alex\",\"city\")=\"Boston\"",
      "SET contact(\"Sam\",\"city\")=\"Chicago\"",
      "KILL contact(\"Alex\")",
      "WRITE $DATA(contact(\"Alex\")),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "contact(\"Alex\",\"city\")": "Boston"
        },
        "output": "",
        "explain": "Create Alex's city."
      },
      {
        "line": 1,
        "memory": {
          "contact(\"Alex\",\"city\")": "Boston",
          "contact(\"Sam\",\"city\")": "Chicago"
        },
        "output": "",
        "explain": "Create Sam's branch."
      },
      {
        "line": 2,
        "memory": {
          "contact(\"Sam\",\"city\")": "Chicago"
        },
        "output": "",
        "explain": "Remove Alex and all descendants."
      },
      {
        "line": 3,
        "memory": {
          "contact(\"Sam\",\"city\")": "Chicago"
        },
        "output": "0\n",
        "explain": "Alex no longer exists."
      }
    ],
    "question": "What does KILL contact(\"Alex\") remove?",
    "choices": [
      "Only the city value",
      "Alex and its descendants",
      "The entire contact tree"
    ],
    "answer": 1,
    "why": "KILL targets the selected subtree.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Create two branches, remove one, inspect the other.",
    "lab": "trees",
    "reference": "commands.html#kill",
    "id": "14"
  },
  {
    "title": "Inspect a node",
    "topic": "$DATA",
    "minutes": 10,
    "goal": "Distinguish missing, valued and branching nodes.",
    "intro": "$DATA reports two facts: whether a node has a value and whether it has descendants. The four results are 0 (neither), 1 (value only), 10 (descendants only), and 11 (both). An empty string is still a defined value.",
    "code": [
      "SET contact(\"Alex\",\"city\")=\"Boston\"",
      "WRITE $DATA(contact(\"Alex\")),!",
      "SET contact(\"Alex\")=\"\"",
      "WRITE $DATA(contact(\"Alex\")),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "contact(\"Alex\",\"city\")": "Boston"
        },
        "output": "",
        "explain": "Alex has a child but no value."
      },
      {
        "line": 1,
        "memory": {
          "contact(\"Alex\",\"city\")": "Boston"
        },
        "output": "10\n",
        "explain": "Descendants only."
      },
      {
        "line": 2,
        "memory": {
          "contact(\"Alex\")": "",
          "contact(\"Alex\",\"city\")": "Boston"
        },
        "output": "10\n",
        "explain": "Assign an empty string at the parent."
      },
      {
        "line": 3,
        "memory": {
          "contact(\"Alex\")": "",
          "contact(\"Alex\",\"city\")": "Boston"
        },
        "output": "10\n11\n",
        "explain": "The parent now has both value and descendants."
      }
    ],
    "question": "Which result means descendants but no value?",
    "choices": [
      "1",
      "10",
      "11"
    ],
    "answer": 1,
    "why": "10 marks a branching node without a value.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Use the tree inspector to produce all four results.",
    "lab": "trees",
    "reference": "functions.html",
    "id": "15"
  },
  {
    "title": "Read an optional value",
    "topic": "$GET",
    "minutes": 10,
    "goal": "Retrieve a value or an explicit fallback.",
    "intro": "Reading an undefined variable directly can cause an error. $GET returns its value when defined, otherwise the specified fallback. It does not create the missing node. A defined empty string is returned as-is.",
    "code": [
      "SET city(\"Alex\")=\"Boston\"",
      "WRITE $GET(city(\"Sam\"),\"Unknown\"),!",
      "WRITE $DATA(city(\"Sam\")),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "city(\"Alex\")": "Boston"
        },
        "output": "",
        "explain": "Only Alex is defined."
      },
      {
        "line": 1,
        "memory": {
          "city(\"Alex\")": "Boston"
        },
        "output": "Unknown\n",
        "explain": "Use the fallback for Sam."
      },
      {
        "line": 2,
        "memory": {
          "city(\"Alex\")": "Boston"
        },
        "output": "Unknown\n0\n",
        "explain": "Sam remains undefined."
      }
    ],
    "question": "Does $GET create a missing node?",
    "choices": [
      "Yes",
      "No",
      "Only with a fallback"
    ],
    "answer": 1,
    "why": "It retrieves a value or fallback, not an assignment.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Compare a missing value with a defined empty value.",
    "lab": "trees",
    "reference": "functions.html",
    "id": "16"
  },
  {
    "title": "Visit keys in order",
    "topic": "$ORDER",
    "minutes": 10,
    "goal": "Walk through existing subscripts.",
    "intro": "$ORDER returns the next subscript at the chosen level, not its stored value. Begin with the empty string and stop when the result is empty. This lesson uses nonempty ASCII name keys and ordinary collation.",
    "code": [
      "SET city(\"Sam\")=\"Chicago\",city(\"Alex\")=\"Boston\"",
      "SET name=\"\"",
      "FOR  SET name=$ORDER(city(name)) QUIT:name=\"\"  WRITE name,\": \",city(name),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "city(\"Alex\")": "Boston",
          "city(\"Sam\")": "Chicago"
        },
        "output": "",
        "explain": "Create two keys in reverse alphabetical order."
      },
      {
        "line": 1,
        "memory": {
          "name": "",
          "city(\"Alex\")": "Boston",
          "city(\"Sam\")": "Chicago"
        },
        "output": "",
        "explain": "Initialize the traversal cursor."
      },
      {
        "line": 2,
        "memory": {
          "name": "Alex"
        },
        "output": "Alex: Boston\n",
        "explain": "First key; display its value."
      },
      {
        "line": 2,
        "memory": {
          "name": "Sam"
        },
        "output": "Alex: Boston\nSam: Chicago\n",
        "explain": "Next key."
      },
      {
        "line": 2,
        "memory": {
          "name": ""
        },
        "output": "Alex: Boston\nSam: Chicago\n",
        "explain": "Empty return ends the loop. The diagram omits unchanged city nodes."
      }
    ],
    "question": "What does $ORDER return?",
    "choices": [
      "The next key",
      "The stored value",
      "The number of children"
    ],
    "answer": 0,
    "why": "Use the returned subscript to retrieve a value.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Traverse the name keys in the tree lab.",
    "lab": "trees",
    "reference": "functions.html",
    "id": "17"
  },
  {
    "title": "Two kinds of memory",
    "topic": "Local and global",
    "minutes": 10,
    "goal": "Distinguish process-local and database-backed variables.",
    "intro": "Local variables belong to the current M process. A global name begins with ^ and refers to database-backed information in a configured environment. Global data may be shared across processes; it is not automatically private. Use a dedicated learning database.",
    "code": [
      "SET message=\"Local\"",
      "SET ^SSTLearn(\"message\")=\"Saved\"",
      "WRITE message,!,^SSTLearn(\"message\"),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "message": "Local"
        },
        "output": "",
        "explain": "Store a process-local value."
      },
      {
        "line": 1,
        "memory": {
          "message": "Local",
          "^SSTLearn(\"message\")": "Saved"
        },
        "output": "",
        "explain": "Store a database-backed value."
      },
      {
        "line": 2,
        "memory": {
          "message": "Local",
          "^SSTLearn(\"message\")": "Saved"
        },
        "output": "Local\nSaved\n",
        "explain": "Read both. This is a simulation."
      }
    ],
    "question": "Which name denotes a global?",
    "choices": [
      "message",
      "^SSTLearn",
      "$GET"
    ],
    "answer": 1,
    "why": "The caret identifies a global reference.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Try a simulated process restart in the memory lab.",
    "lab": "memory",
    "reference": "langfeat.html",
    "id": "18"
  },
  {
    "title": "Remember between processes",
    "topic": "Persistence",
    "minutes": 10,
    "goal": "See how global data can outlive a process.",
    "intro": "In a dedicated YottaDB learning database, a value written by one process can be read by another using the same global directory. Local variables do not survive process termination. The example reads a global written earlier by you; it does not assume a production database.",
    "code": [
      "WRITE $GET(message,\"Missing local\"),!",
      "WRITE $GET(^SSTLearn(\"message\"),\"Missing global\"),!"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {
          "^SSTLearn(\"message\")": "Saved"
        },
        "output": "Missing local\n",
        "explain": "A new process has no earlier local message."
      },
      {
        "line": 1,
        "memory": {
          "^SSTLearn(\"message\")": "Saved"
        },
        "output": "Missing local\nSaved\n",
        "explain": "The global was saved by the previous process using the same database."
      }
    ],
    "question": "What must two processes share to retrieve the same saved global?",
    "choices": [
      "A variable named message",
      "The same mapped database for that global",
      "The same terminal window"
    ],
    "answer": 1,
    "why": "The global mapping determines where data is stored.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Simulate two processes. For real practice first execute lesson 18 in an isolated database.",
    "lab": "memory",
    "reference": "langfeat.html",
    "id": "19"
  },
  {
    "title": "Build a contact directory",
    "topic": "Project",
    "minutes": 10,
    "goal": "Save and list a small set of contacts.",
    "intro": "Combine global nodes, $ORDER and $GET in a saved routine. This example writes two fictional contacts and lists them. Run it only in a dedicated learning database; it updates two specific keys and leaves other data alone. Use a fresh database for the shown output.",
    "code": [
      "SSTCONTACT ; Learning project",
      " NEW name",
      " SET ^SSTLearn(\"contact\",\"Alex\",\"city\")=\"Boston\"",
      " SET ^SSTLearn(\"contact\",\"Sam\",\"city\")=\"Chicago\"",
      " SET name=\"\"",
      " FOR  SET name=$ORDER(^SSTLearn(\"contact\",name)) QUIT:name=\"\"  WRITE name,\": \",$GET(^SSTLearn(\"contact\",name,\"city\"),\"Unknown\"),!",
      " QUIT"
    ],
    "frames": [
      {
        "line": 0,
        "memory": {},
        "output": "",
        "explain": "Entry point and comment."
      },
      {
        "line": 1,
        "memory": {},
        "output": "",
        "explain": "NEW protects the caller's local name variable."
      },
      {
        "line": 2,
        "memory": {
          "^SSTLearn(\"contact\",\"Alex\",\"city\")": "Boston"
        },
        "output": "",
        "explain": "Save the first contact."
      },
      {
        "line": 3,
        "memory": {
          "^SSTLearn(\"contact\",\"Alex\",\"city\")": "Boston",
          "^SSTLearn(\"contact\",\"Sam\",\"city\")": "Chicago"
        },
        "output": "",
        "explain": "Save the second."
      },
      {
        "line": 4,
        "memory": {
          "name": ""
        },
        "output": "",
        "explain": "Start the traversal cursor."
      },
      {
        "line": 5,
        "memory": {
          "name": "Alex"
        },
        "output": "Alex: Boston\n",
        "explain": "Visit Alex."
      },
      {
        "line": 5,
        "memory": {
          "name": "Sam"
        },
        "output": "Alex: Boston\nSam: Chicago\n",
        "explain": "Visit Sam."
      },
      {
        "line": 5,
        "memory": {
          "name": ""
        },
        "output": "Alex: Boston\nSam: Chicago\n",
        "explain": "No more keys."
      },
      {
        "line": 6,
        "memory": {},
        "output": "Alex: Boston\nSam: Chicago\n",
        "explain": "Return to the caller; the global data remains."
      }
    ],
    "question": "Why use $GET for the city field?",
    "choices": [
      "To delete the field",
      "To provide a fallback when no value exists",
      "To sort the contacts"
    ],
    "answer": 1,
    "why": "Missing fields can be displayed safely with a fallback.",
    "practice": "Explore the linked laboratory and predict the result before changing the controls.",
    "task": "Save as SSTCONTACT.m and run yottadb -run ^SSTCONTACT in your isolated learning environment. Add a fictional third contact and predict its place in the listing.",
    "lab": "trees",
    "reference": "langfeat.html",
    "id": "20"
  }
];if(typeof module==='object'&&module.exports)module.exports=lessons;else root.SSTLessons=lessons;})(typeof window!=='undefined'?window:globalThis);
