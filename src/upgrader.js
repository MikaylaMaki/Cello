import Automerge from 'automerge';
import { nanoid } from 'nanoid';

//TODO figure out how to hook this up to a test so we don't mangle our 'real' data
export const upgradeDataFormat = (data) => {
  console.dir(data);
  if(data.version === 1) {
    //In version 1, has all 3 tables, `boards` is not set up properly
    data = Automerge.change(data, (d) => {
      d.version += 1;

      let boardId = nanoid();

      d.boards.byId[boardId] = {};
      d.boards.byId[boardId].id = boardId;
      d.boards.byId[boardId].title = "First Board";
      d.boards.byId[boardId].lists = [];
      data.lists.allIds.forEach((listIds, i) => {
        d.boards.byId[boardId].lists.push(listIds);
      });

      d.boards.allIds.push(boardId);
    });
  }
  if(data.version === 2) {
    data = Automerge.change(data, (d) => {
      d.version += 1;

      data.cards.allIds.forEach((cardId, i) => {
        d.cards.byId[cardId].title = data.cards.byId[cardId].cardTitle;
        delete d.cards.byId[cardId].cardTitle;
      });
      data.lists.allIds.forEach((listId, i) => {
        d.lists.byId[listId].title = data.lists.byId[listId].listTitle;
        delete d.lists.byId[listId].listTitle;
      });
    });
  }
  if(data.version === 3) {
    //TODO: Clean up refrence-less card objects
  }
  return data;
}
