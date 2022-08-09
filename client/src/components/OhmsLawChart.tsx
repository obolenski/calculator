import { Component, For } from 'solid-js'

import Table from '@suid/material/Table'
import TableBody from '@suid/material/TableBody'
import TableCell from '@suid/material/TableCell'
import TableContainer from '@suid/material/TableContainer'
import TableRow from '@suid/material/TableRow'
import Paper from '@suid/material/Paper'

const OhmsLawChart: Component = () => {
  const formulas = ['V = I x R', 'I = V ÷ R', 'R = V ÷ I', 'P = V x I']
  return (
    <TableContainer component={Paper}>
      <Table sx={{ padding: 300 }}>
        <TableBody>
          <For each={formulas}>
            {(formula) => (
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  {formula}
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OhmsLawChart
