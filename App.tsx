import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

interface ToDo {
  id: number;
  title: string;
  statue: boolean;
}

const App = () => {
  const [title, setTitle] = useState<string>('');
  const [toDo, setToDo] = useState<ToDo[]>([]);
  const [editId, setEditId] = useState<number>(0);
  const [editTitle, setEditTitle] = useState<string>('');

  const handleAdd = () => {
    if (title.trim() === '') return;

    const newToDo = {
      id: Date.now(),
      title,
      statue: false,
    };

    setToDo(prev => [...prev, newToDo]);
    setTitle('');
  };

  const handleDelete = (deleteId: number) => {
    if (deleteId !== 0) {
      const updatedToDo = toDo.filter(item => item.id !== deleteId);
      setToDo(updatedToDo);
    }
  };

  const handleEdit = () => {
    if (editTitle.trim() === '') return;

    setToDo(prev =>
      prev.map(item => (item.id === editId ? { ...item, title: editTitle } : item)),
    );

    setEditId(0);
    setEditTitle('');
  };

  const handleStartEdit = (editId: number, currentTitle: string) => {
    setEditId(editId);
    setEditTitle(currentTitle);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a new task"
          value={title}
          onChangeText={setTitle}
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={toDo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {item.id === editId ? (
              <TextInput
                style={styles.editInput}
                value={editTitle}
                onChangeText={setEditTitle}
              />
            ) : (
              <Text style={styles.todoText}>{item.title}</Text>
            )}

            <View style={styles.buttonContainer}>
              {item.id === editId ? (
                <Pressable style={styles.saveButton} onPress={handleEdit}>
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.editButton}
                  onPress={() => handleStartEdit(item.id, item.title)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
              )}
              <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    borderColor: '#ccc',
    backgroundColor: 'white',
    color: '#333',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  todoText: {
    color: '#333',
    fontSize: 18,
    flex: 1,
  },
  editInput: {
    flex: 1,
    borderColor: '#ccc',
    color: '#333',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  editButton: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
