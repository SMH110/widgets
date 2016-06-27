(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['chai', 'sinon', '../lib/todo-list'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('chai'), require('sinon'), require('../lib/todo-list'));
  } else {
    factory(chai, sinon, ToDoList);
  }
} (function (chai, sinon, ToDoList) {
  'use strict';

  const expect = chai.expect;

  describe('To-Do List', () => {
    let sandbox, instance, isUserConfirming;

    beforeEach(() => {
      instance = new ToDoList();
      if (typeof window === 'undefined') {
        global.window = {
          confirm: () => { }
        };
      }
      sandbox = sinon.sandbox.create();
      isUserConfirming = false;
      sandbox.stub(window, 'confirm', () => isUserConfirming);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('It should have no tasks when created', () => {
      expect(instance.tasks()).to.have.length(0);
    });

    it('The text box for entering new tasks should be empty', () => {
      expect(instance.newTaskText()).to.equal('');
    });

    it('The mark as done button should not be displayed', () => {
      expect(instance.isMarkAsDoneVisible()).to.equal(false);
    });

    it('The mark as not done button should not be displayed', () => {
      expect(instance.isMarkNotDoneVisible()).to.equal(false);
    });

    it('The delete button should not be displayed', () => {
      expect(instance.isDeleteVisible()).to.equal(false);
    });
    describe('when a user try to enter an empty name to the task list and clicks add', () => {
      beforeEach(() => {
        instance.newTaskText('');
        instance.addTask();
      });

      it('It should not add the empty name to the tasks list', () => {
        expect(instance.tasks().length).to.equal(0);
      });

    });

    describe('When a user enters a task and clicks add', () => {
      beforeEach(() => {
        instance.newTaskText('Wash clothes');
        instance.addTask();
      });

      it('The task should appear in the list', () => {
        expect(instance.tasks()[0].name()).to.equal('Wash clothes');
      });

      it('The task should not be selected', () => {
        expect(instance.tasks()[0].isSelected()).to.equal(false);
      });

      it('The task should not be marked as done', () => {
        expect(instance.tasks()[0].isDone()).to.equal(false);
      });

      it('The text box for entering new tasks should be empty', () => {
        expect(instance.newTaskText()).to.equal('');
      });

      it('The mark as done button should not be displayed', () => {
        expect(instance.isMarkAsDoneVisible()).to.equal(false);
      });

      it('The mark as not done button should not be displayed', () => {
        expect(instance.isMarkNotDoneVisible()).to.equal(false);
      });

      it('The delete button should not be displayed', () => {
        expect(instance.isDeleteVisible()).to.equal(false);
      });

      describe('When the user adds another task', () => {
        beforeEach(() => {
          instance.newTaskText('Fix computer');
          instance.addTask();
        });

        it('The task should appear in the list', () => {
          expect(instance.tasks()[1].name()).to.equal('Fix computer');
        });

        it('The task should not be selected', () => {
          expect(instance.tasks()[1].isSelected()).to.equal(false);
        });

        it('The task should not be marked as done', () => {
          expect(instance.tasks()[1].isDone()).to.equal(false);
        });

        it('The text box for entering new tasks should be empty', () => {
          expect(instance.newTaskText()).to.equal('');
        });

        it('The mark as done button should not be displayed', () => {
          expect(instance.isMarkAsDoneVisible()).to.equal(false);
        });

        it('The mark as not done button should not be displayed', () => {
          expect(instance.isMarkNotDoneVisible()).to.equal(false);
        });

        it('The delete button should not be displayed', () => {
          expect(instance.isDeleteVisible()).to.equal(false);
        });

        describe('When the user selects a task that has not been done', () => {
          beforeEach(() => {
            instance.tasks()[0].isSelected(true);
          });

          it('The mark as done button should be displayed', () => {
            expect(instance.isMarkAsDoneVisible()).to.equal(true);
          });

          it('The mark as not done button should not be displayed', () => {
            expect(instance.isMarkNotDoneVisible()).to.equal(false);
          });

          it('The delete button should be displayed', () => {
            expect(instance.isDeleteVisible()).to.equal(true);
          });

          describe('When the user clicks the mark as done button', () => {
            beforeEach(() => {
              instance.markAsDone();
            });

            it('The task should be marked as done', () => {
              expect(instance.tasks()[0].isDone()).to.equal(true);
            });

            it('The mark as done button should not be displayed', () => {
              expect(instance.isMarkAsDoneVisible()).to.equal(false);
            });

            it('The mark not done button should be displayed', () => {
              expect(instance.isMarkNotDoneVisible()).to.equal(true);
            });

            it('The delete button should be displayed', () => {
              expect(instance.isDeleteVisible()).to.equal(true);
            });

            describe('When the user clicks the mark not done button', () => {
              beforeEach(() => {
                instance.markNotDone();
              });

              it('The task should not be marked as done', () => {
                expect(instance.tasks()[0].isDone()).to.equal(false);
              });

              it('The mark as done button should be displayed', () => {
                expect(instance.isMarkAsDoneVisible()).to.equal(true);
              });

              it('The mark not done button should not be displayed', () => {
                expect(instance.isMarkNotDoneVisible()).to.equal(false);
              });

              it('The delete button should be displayed', () => {
                expect(instance.isDeleteVisible()).to.equal(true);
              });
            });

            describe('When the user selects the other task as well - Asserting the scenario where multiple tasks of different statuses have been selected', () => {
              beforeEach(() => {
                instance.tasks()[1].isSelected(true);
              });

              it('The mark as done button should be displayed', () => {
                expect(instance.isMarkAsDoneVisible()).to.equal(true);
              });

              it('The mark not done button should be displayed', () => {
                expect(instance.isMarkNotDoneVisible()).to.equal(true);
              });

              it('The delete button should be displayed', () => {
                expect(instance.isDeleteVisible()).to.equal(true);
              });

              describe('When the user de-selects all tasks - Asserting the scenario where multiple tasks of different status are present and none selected', () => {
                beforeEach(() => {
                  instance.tasks().forEach(x => x.isSelected(false));
                });

                it('The mark as done button should be not displayed', () => {
                  expect(instance.isMarkAsDoneVisible()).to.equal(false);
                });

                it('The mark not done button should be not displayed', () => {
                  expect(instance.isMarkNotDoneVisible()).to.equal(false);
                });

                it('The delete button should be not displayed', () => {
                  expect(instance.isDeleteVisible()).to.equal(false);
                });
              });
            });
          });
        });

        describe('When the user selects both tasks and marks them as done', () => {
          beforeEach(() => {
            instance.tasks().forEach(t => t.isSelected(true));
            instance.markAsDone();
          });

          it('Both tasks should be marked as done', () => {
            expect(instance.tasks()[0].isDone()).to.equal(true);
            expect(instance.tasks()[1].isDone()).to.equal(true);
          });

          describe('When the user marks both selected tasks as not done', () => {
            beforeEach(() => {
              instance.markNotDone();
            });

            it('Both tasks should not be marked as done', () => {
              expect(instance.tasks()[0].isDone()).to.equal(false);
              expect(instance.tasks()[1].isDone()).to.equal(false);
            });
          });
        });

        describe('When the user selects a tasks and clicks delete', () => {
          let selectedTask;

          beforeEach(() => {
            selectedTask = instance.tasks()[0];
            selectedTask.isSelected(true);
          });

          describe('And the user clicks OK', () => {
            beforeEach(() => {
              isUserConfirming = true;
              instance.deleteTasks();
            });

            it('It should show a confirmation message to the user', () => {
              expect(window.confirm).to.have.been.calledWithExactly('Are you sure you want to delete the selected task(s)?');
            });

            it('It should delete the selected task', () => {
              expect(instance.tasks()).to.have.length(1);
              expect(instance.tasks()[0]).to.not.equal(selectedTask);
            });

            it('The mark as done button should not be displayed', () => {
              expect(instance.isMarkAsDoneVisible()).to.equal(false);
            });

            it('The mark as not done button should not be displayed', () => {
              expect(instance.isMarkNotDoneVisible()).to.equal(false);
            });

            it('The delete button should not be displayed', () => {
              expect(instance.isDeleteVisible()).to.equal(false);
            });
          });

          describe('And the user clicks Cancel', () => {
            beforeEach(() => {
              isUserConfirming = false;
              instance.deleteTasks();
            });

            it('It should show a confirmation message to the user', () => {
              expect(window.confirm).to.have.been.calledWithExactly('Are you sure you want to delete the selected task(s)?');
            });

            it('It should not delete the selected task', () => {
              expect(instance.tasks()).to.have.length(2);
            });

            it('The mark as done button should be displayed', () => {
              expect(instance.isMarkAsDoneVisible()).to.equal(true);
            });

            it('The mark as not done button should not be displayed', () => {
              expect(instance.isMarkNotDoneVisible()).to.equal(false);
            });

            it('The delete button should be displayed', () => {
              expect(instance.isDeleteVisible()).to.equal(true);
            });
          });
        });

        describe('When the user selects several tasks and clicks delete and clicks OK', () => {
          beforeEach(() => {
            instance.tasks().forEach(x => x.isSelected(true));
            isUserConfirming = true;
            instance.deleteTasks();
          });

          it('It should show a confirmation message to the user', () => {
            expect(window.confirm).to.have.been.calledWithExactly('Are you sure you want to delete the selected task(s)?');
          });

          it('It should delete the selected tasks', () => {
            expect(instance.tasks()).to.be.empty;
          });

          it('The mark as done button should not be displayed', () => {
            expect(instance.isMarkAsDoneVisible()).to.equal(false);
          });

          it('The mark as not done button should not be displayed', () => {
            expect(instance.isMarkNotDoneVisible()).to.equal(false);
          });

          it('The delete button should not be displayed', () => {
            expect(instance.isDeleteVisible()).to.equal(false);
          });
        });



        describe('When the user selects several tasks and clicks delete and clicks Cancel', () => {
          beforeEach(() => {
            instance.tasks().forEach(x => x.isSelected(true));
            isUserConfirming = false;
            instance.deleteTasks();
          });

          it('It should show a confirmation message to the user', () => {
            expect(window.confirm).to.have.been.calledWithExactly('Are you sure you want to delete the selected task(s)?');
          });

          it('It should delete the selected tasks', () => {
            expect(instance.tasks()).to.be.full;
          });

          it('The mark as done button should be displayed', () => {
            expect(instance.isMarkAsDoneVisible()).to.equal(true);
          });

          it('The mark as not done button should not be displayed', () => {
            expect(instance.isMarkNotDoneVisible()).to.equal(false);
          });

          it('The delete button should be displayed', () => {
            expect(instance.isDeleteVisible()).to.equal(true);
          });
        });
      });

    });
  });
}));