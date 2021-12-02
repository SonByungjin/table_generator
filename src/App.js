import './App.css';

import * as React from 'react';

const App = () => {
  const [{ row, col, startRow, startCol, endRow, endCol, tableOn, mergeOn, customTable }, setState] = React.useState({
    row: 0,
    col: 0,
    startRow: 0,
    startCol: 0,
    endRow: 0,
    endCol: 0,
    tableOn: false,
    mergeOn: false,
    customTable: <></>
  })

  const selectCell = (currTrNum, currTdNum) => {
    if(startRow * startCol === 0) {
      setState((p)=>({
        ...p,
        startRow: currTrNum,
        startCol: currTdNum,
      }))
    } else if (endRow * endCol === 0) {
      setState((p)=>({
        ...p,
        endRow: currTrNum,
        endCol: currTdNum,
      }))
    } else {
      return;
    }
  }

  const renderMergeTableTd = (currTrNum, currTdNum, initBoxTr, initBoxTd, finalBoxTr, finalBoxTd) => {
    if(currTrNum === initBoxTr && currTdNum === initBoxTd) {
      return <td rowSpan={1 + finalBoxTr - initBoxTr} colSpan={1 + finalBoxTd - initBoxTd}/>
    } else if ((currTrNum >= initBoxTr && currTrNum <= finalBoxTr) && (currTdNum >= initBoxTd && currTdNum <= finalBoxTd)) {
      return null;
    } else {
      return <td />
    }
  }

  const readyTable = () => {
    return (
        <tbody>
          {Array.from(Array(row)).map((e, idx)=>{
            return (
            <tr key={idx}>
              {Array.from(Array(col)).map((E, IDX)=>{
                if(startRow * startCol * endRow * endCol !== 0 && mergeOn) {
                  const initBoxTr = startRow > endRow ? endRow : startRow;
                  const initBoxTd = startCol > endCol ? endCol : startCol;
                  const finalBoxTr = initBoxTr === startRow ? endRow : startRow;
                  const finalBoxTd = initBoxTd === startCol ? endCol : startCol;
                  return renderMergeTableTd(idx + 1, IDX + 1, initBoxTr, initBoxTd, finalBoxTr, finalBoxTd);
                } else {
                  return (
                    <td 
                      key={IDX}
                      style={{
                        cursor: 'pointer',
                        background: `${idx + 1}${IDX + 1}` === `${startRow}${startCol}` || `${idx + 1}${IDX + 1}` === `${endRow}${endCol}` ? 'black' : 'transparent'
                      }}
                      onClick={() => {selectCell(idx + 1, IDX + 1)}}>
                    </td>);
                }
                })}
            </tr>)})}
        </tbody>
    )
  }

  const createTable = () => {
    setState((p)=>({
        ...p,
        startCol: 0,
        startRow: 0,
        endCol: 0,
        endRow: 0,
        tableOn: true,
        mergeOn: false,
        // tdString: Array.from(Array(row*col)),
        customTable: readyTable()
      }));
  }

  const resetTable = () => {
    setState((p)=>({
      ...p,
      startRow: 0,
      startCol: 0,
      endRow: 0,
      endCol: 0,
      tableOn: true,
      mergeOn: false,
    }));
  }

  const mergeTable = () => {
    setState((p)=>({
      ...p,
      mergeOn: true,
    }));
  }
  
  return (
    <div className="App">
      <div>
        <span>세로</span>
        <input type="number" value={row} onChange={(e)=>{setState((p)=>({...p, row: Number(e.target.value), tableOn: false}))}}/>
        &nbsp;
        <span>가로</span>
        <input type="number" value={col} onChange={(e)=>{setState((p)=>({...p, col: Number(e.target.value), tableOn: false}))}}/>
        <button onClick={createTable}>생성</button>
      </div>
      <div>
        <span>시작점</span>
        <input value={`${startRow}${startCol}`} readOnly/>
        &nbsp;
        <span>끝지점</span>
        <input value={`${endRow}${endCol}`} readOnly/>
        <br/>
      </div>
      <br/>
      <br/>
      <table>
          {/* {tableOn && readyTable()} */}
          {customTable}
      </table>
      <br/>
      {startRow * startCol * endRow * endCol !== 0 
        ? <React.Fragment>
            <button onClick={resetTable}>재선택</button> 
            &nbsp;
            &nbsp;
            <button onClick={mergeTable}>병합</button>
          </React.Fragment>
        : null}
    </div>
  );
};

export default App;