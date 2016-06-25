(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define(['knockout'], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(require('knockout'));
    } else {
        window.ToDoList = factory(ko);
    }
} (function (ko) {
    return function ToDoList() {
        'use strict';
        let tasks = ko.observableArray([]);
        let newTaskText = ko.observable("");

        function addTask() {
            if (newTaskText() === "") return;
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
            tasks,
            newTaskText,
            addTask,
            isMarkAsDoneVisible,
            isMarkNotDoneVisible,
            isDeleteVisible,
            markAsDone,
            markNotDone,
            deleteTasks
        };
    };
}));