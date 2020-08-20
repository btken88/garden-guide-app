# Garden Guide App

## General Info

This is the front end for the Garden Guide App, a React Native mobile app that allows users to find and save plants to their garden, take notes on how different plants perform, create garden To Do lists, and more.

## Table of Contents

- [Garden Guide App](#garden-guide-app)
  - [General Info](#general-info)
  - [Table of Contents](#table-of-contents)
  - [Inspiration](#inspiration)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Example Code](#example-code)
    - [To Do List Screen](#to-do-list-screen)
    - [To Do List Cards](#to-do-list-cards)
  - [Features](#features)
  - [Status](#status)
  - [Download the app](#download-the-app)
  - [Contact](#contact)
  - [License](#license)

## Inspiration

The Garden Guide App was born out of a need for a centralized place to keep all my gardening records. I found I was keeping notes, seed packets, growing information sheets, and custom calendars in dozens of different places and formats, and had no way to easily keep records. Garden Guide was built to solve those problems, with a database of plants and their growing needs, the ability to create to do lists and actions, and to track notes about each different plant in the dgarden.

## Technologies

- React Native
- JavaScript
- AsyncStorage

## Setup

To get Garden Guide installed and running, you will need both the Garden Guide app and the Garden Guide API. The back end and setup instructions to run in development can be found at [Garden Guide API](https://github.com/btken88/garden-guide-api). Once you've installed the back end, you can get the front end running by navigating into the directory, installing node modules and starting the expo server:

```bash
cd garden-guide-app
npm install
expo start
```

## Example Code

### To Do List Screen

```javascript
function todosList() {
  return (
    <>
      <FlatList
        data={notDone}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return <TodoCard
            todoData={item}
            todos={todos}
            setTodos={setTodos}
            tokenValue={tokenValue} />
        }} />
      {done.length
        ? <View style={{ maxHeight: 200 }}>
          <Text style={[styles.notodo, { margin: 0 }]}>Completed</Text>
          <FlatList
            data={done}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return <TodoCard
                todoData={item}
                todos={todos}
                setTodos={setTodos}
                tokenValue={tokenValue} />
            }} />
        </View>
        : null}
    </>
  )
}

return (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.fill}>
      <HeaderBar title='To Do List' />
      {newTodo
        ? <TodoForm
          setNewTodo={setNewTodo}
          todos={todos}
          setTodos={setTodos}
          tokenValue={tokenValue} />
        : <TouchableOpacity onPress={() => setNewTodo(true)}>
          <Text style={styles.button}>Add a new To Do</Text>
        </TouchableOpacity>}
      {todos.length
        ? todosList()
        : <Text style={styles.notodo}>No Todos Yet</Text>}
    </View>
  </SafeAreaView>
)
```

### To Do List Cards

```javascript
function createCard() {
  if (edit) {
    return (
      <>
        <TextInput
          style={styles.input}
          onChangeText={text => setTodo({ ...todo, todo: text })}
          value={todo.todo}
          multiline />
        <View style={styles.buttonContainer}>
          <View style={styles.doneContainer}>
            <Switch
              style={{ marginRight: 10 }}
              value={todo.done}
              onValueChange={markDone} />
            <Text style={styles.text}>Done!</Text>
          </View>
          <View style={styles.doneContainer}>
            <Switch
              style={{ marginRight: 10 }}
              value={todo.urgent}
              onValueChange={() => setTodo({ ...todo, urgent: !todo.urgent })} />
            <Text style={styles.text}>Urgent</Text>
          </View>
          <Button title="Save" onPress={saveEdit} color='#033a07' />
          <Button title="Delete" onPress={deleteTodo} color='#033a07' />
        </View>
      </>
    )
  } else {
    return (
      <>
        <Text style={styles.text}>{todo.todo}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.doneContainer}>
            <Switch
              style={{ marginRight: 10 }}
              value={todo.done}
              onValueChange={markDone} />
            <Text style={styles.text}>Done!</Text>
          </View>
          <Button title="Edit" onPress={() => setEdit(true)} color='#033a07' />
        </View>
      </>
    )
  }
}

return (
  <View style={styles.todoCard}>
    {createCard()}
  </View>
)
```

## Features

Current Features:

- Create a secure login to save, update, and delete todos and plants for your garden
- View current and upcoming weather for your zip code
- Create garden to dos, update them as needed, mark as urgent, and move off your list when done
- View details about different vegetables and their varieties
- See detailed growing information about varieties in our database and your garden
- Add notes about each variety and how it grew
- Add new varieties to our database

Future Features:

- Add due dates to to dos and see reminders on your home screen
- Get exact planting dates based on your zip code and local last frost
- View lists of companion plants that do well together in the garden

## Status

The application is fully functional and ready to be enjoyed as is. Future updates and improvements are still a possibility.

## Download the app

[Garden Guide](https://gardenguide.app/)

## Contact

Created by [Bryce Kennedy](https://www.linkedin.com/in/bryce-kennedy/)

If you have any questions or comments, suggestions, or bug fixes, feel free to reach out to me.

## License

[Click to view](https://github.com/btken88/garden-guide-app/blob/master/license.txt)
