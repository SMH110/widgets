'use strict';

import * as ko from 'knockout';

function ToDoList() {
    let tasks = ko.observableArray([]);
    let newTaskText = ko.observable("");
    
    function addTask() {
        if (newTaskText() === "")
            return;
        let task = {
            name: ko.observable(newTaskText()),
            isSelected: ko.observable(false),
            isDone: ko.observable(false)
        };
        tasks.push(task);
        newTaskText("");
    }
    function deleteTasks() {
        let confirmDelete = window.confirm('Are you sure you want to delete the selected task(s)?');
        if (confirmDelete) {
            tasks.remove(task => task.isSelected());
        }
    }
    function markAsDone() {
        tasks().filter(task => task.isSelected())
            .forEach(task => task.isDone(true));
    }
    function markNotDone() {
        tasks().filter(task => task.isSelected())
            .forEach(task => task.isDone(false));
    }
    function isMarkAsDoneVisible() {
        for (let task of tasks()) {
            if (task.isSelected() && !task.isDone()) {
                return true;
            }
        }
        return false;
    }
    function isMarkNotDoneVisible() {
        for (let task of tasks()) {
            if (task.isSelected() && task.isDone()) {
                return true;
            }
        }
        return false;
    }
    function isDeleteVisible() {
        for (let task of tasks()) {
            if (task.isSelected()) {
                return true;
            }
        }
        return false;
    }
    return {
        tasks: tasks,
        newTaskText: newTaskText,
        addTask: addTask,
        isMarkAsDoneVisible: isMarkAsDoneVisible,
        isMarkNotDoneVisible: isMarkNotDoneVisible,
        isDeleteVisible: isDeleteVisible,
        markAsDone: markAsDone,
        markNotDone: markNotDone,
        deleteTasks: deleteTasks
    };
}

export = ToDoList;