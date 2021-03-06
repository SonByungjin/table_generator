import './App.css';

import * as React from 'react';

const App = () => {
  const [{ row, col, startRow, startCol, endRow, endCol, tableOn, mergeOn, customTable, mergeMap }, setState] = React.useState({
    row: 0,
    col: 0,
    startRow: 0,
    startCol: 0,
    endRow: 0,
    endCol: 0,
    tableOn: false,
    mergeOn: false,
    customTable: <></>,
    mergeMap: [],
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

  const receiveMergeEl = (currTrNum, currTdNum, initBoxTr, initBoxTd, finalBoxTr, finalBoxTd) => {
    if(currTrNum === initBoxTr && currTdNum === initBoxTd) {
      return 0
    } else if ((currTrNum >= initBoxTr && currTrNum <= finalBoxTr) && (currTdNum >= initBoxTd && currTdNum <= finalBoxTd)) {
      return 0;
    } else {
      return 1
    }
  }

  const recieveMergeMap = () => {
    return mergeMap.map((e, idx) => {
      return e.map((E, IDX) => {
        const initBoxTr = startRow > endRow ? endRow : startRow;
        const initBoxTd = startCol > endCol ? endCol : startCol;
        const finalBoxTr = initBoxTr === startRow ? endRow : startRow;
        const finalBoxTd = initBoxTd === startCol ? endCol : startCol;
        return E === 0 ? 0 : receiveMergeEl(idx + 1, IDX + 1, initBoxTr, initBoxTd, finalBoxTr, finalBoxTd);
      })
    })
  }

  // const renderMergeTableTd = (currTrNum, currTdNum, initBoxTr, initBoxTd, finalBoxTr, finalBoxTd) => {
  //   if(currTrNum === initBoxTr && currTdNum === initBoxTd) {
  //     return <td rowSpan={1 + finalBoxTr - initBoxTr} colSpan={1 + finalBoxTd - initBoxTd}/>
  //   } else if ((currTrNum >= initBoxTr && currTrNum <= finalBoxTr) && (currTdNum >= initBoxTd && currTdNum <= finalBoxTd)) {
  //     return null;
  //   } else {
  //     return <td />
  //   }
  // }

  const returnMergeTable = () => {
    return <tbody>
      {mergeMap.map((e, idx) => {
        return <tr key={idx}>
          {e.map((E, IDX) => {
            const cln = E === 1 ? 'active' : 'deactive'
            return !idx 
                    ? <th 
                        className={`${cln} head`} 
                        key={IDX}
                        style={{
                          background: `${idx + 1}${IDX + 1}` === `${startRow}${startCol}` || `${idx + 1}${IDX + 1}` === `${endRow}${endCol}` ? 'black' : 'transparent'
                        }}
                        onClick={() => {selectCell(idx + 1, IDX + 1)}}>
                          HEAD
                      </th> 
                    : <td 
                        className={`${cln} content`}
                        key={IDX}
                        style={{
                          background: `${idx + 1}${IDX + 1}` === `${startRow}${startCol}` || `${idx + 1}${IDX + 1}` === `${endRow}${endCol}` ? 'black' : 'transparent'
                        }}
                        onClick={() => {selectCell(idx + 1, IDX + 1)}}
                        />
            // const initBoxTr = startRow > endRow ? endRow : startRow;
            // const initBoxTd = startCol > endCol ? endCol : startCol;
            // const finalBoxTr = initBoxTr === startRow ? endRow : startRow;
            // const finalBoxTd = initBoxTd === startCol ? endCol : startCol;
            // return renderMergeTableTd(idx + 1, IDX + 1, initBoxTr, initBoxTd, finalBoxTr, finalBoxTd);
          })}
        </tr>
      })}
    </tbody>
  }

  const readyTable = () => {

    return (
        <tbody>
          {Array.from(Array(row)).map((e, idx)=>{
            return (
            <tr key={idx} className={!idx ? 'head' : 'content'}>
              {Array.from(Array(col)).map((E, IDX)=>{
                  if(!idx) {
                    return (
                      <th
                        key={IDX}
                        style={{
                          background: `${idx + 1}${IDX + 1}` === `${startRow}${startCol}` || `${idx + 1}${IDX + 1}` === `${endRow}${endCol}` ? 'black' : 'transparent'
                        }}
                        onClick={() => {selectCell(idx + 1, IDX + 1)}}>
                          HEAD
                      </th>
                    )
                  }
                  return (
                    <td 
                      key={IDX}
                      style={{
                        background: `${idx + 1}${IDX + 1}` === `${startRow}${startCol}` || `${idx + 1}${IDX + 1}` === `${endRow}${endCol}` ? 'black' : 'transparent'
                      }}
                      onClick={() => {selectCell(idx + 1, IDX + 1)}}>
                    </td>);
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
        customTable: readyTable(),
        mergeMap: Array.from(Array(row)).map(e => {
          return Array.from(Array(col).fill(1));
        })
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
      mergeMap: Array.from(Array(row)).map(e => {
        return Array.from(Array(col).fill(1));
      })
    }));
  }

  const mergeTable = () => {
    setState((p)=>({
      ...p,
      startRow: 0,
      startCol: 0,
      endRow: 0,
      endCol: 0,
      mergeOn: true,
      customTable: returnMergeTable(),
      mergeMap: recieveMergeMap()
    }));
  }
  
  return (
    <div className="App">
      <div>
        <span>??????</span>
        <input type="number" value={row} onChange={(e)=>{setState((p)=>({...p, row: Number(e.target.value), tableOn: false}))}}/>
        &nbsp;
        <span>??????</span>
        <input type="number" value={col} onChange={(e)=>{setState((p)=>({...p, col: Number(e.target.value), tableOn: false}))}}/>
        <button onClick={createTable}>??????</button>
      </div>
      <div>
        <span>?????????</span>
        <input value={`${startRow}${startCol}`} readOnly/>
        &nbsp;
        <span>?????????</span>
        <input value={`${endRow}${endCol}`} readOnly/>
        <br/>
      </div>
      <br/>
      <br/>
      <table>
          {tableOn && !mergeOn ? readyTable() : null}
      </table>
      <table>
        {mergeOn && returnMergeTable()}
      </table>
      <br/>
      {(startRow * startCol * endRow * endCol !== 0 || mergeOn)
        ? <React.Fragment>
            <button onClick={resetTable}>?????????</button> 
            &nbsp;
            &nbsp;
            <button onClick={mergeTable}>??????</button>
          </React.Fragment>
        : null}
    </div>
  );
};

export default App;