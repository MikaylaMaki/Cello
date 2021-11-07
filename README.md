Currently working on:
* Cleaning and documenting things
* Getting the boards data structure in
  * Refactoring the lists display to use a specific boards
  * Refactoring the remove and add actions to hook up the boards and follow
    references
* Get Drag and Drop working

Technologies:

automerge CRDTs
with a react.js front end
Using the braid HTTP protocol to communicate: https://braid.org/braidify
???Typescript???

Notes:
store.js is the entry point for coordinating file for application data related stuff.
src > components > [folder] bundles together actions (slices) & views (react components)
localStorage.js provides a model API for pulling and pushing to local storage.
Use redux when you have core data that needs to be synced, managed, etc. etc.
Use react stuff when you have UI logic.
See the difference between EditableText
and store.js for the seperation of concerns.
