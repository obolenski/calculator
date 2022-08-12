import TextField from '@suid/material/TextField'
import Button from '@suid/material/Button'

import { Component, createEffect, createSignal, JSX } from 'solid-js'
import { evaluate } from 'mathjs'

import Page from '../../components/Page'

const [voltage, setVoltage] = createSignal('')
const [current, setCurrent] = createSignal('')
const [resistance, setResistance] = createSignal('')
const [power, setPower] = createSignal('')
const [wireSize, setWireSize] = createSignal('')
const [lastEditedFields, setLastEditedFields] = createSignal(['', ''])
const [activeField, setActiveField] = createSignal('')

const OhmsLaw: Component = () => {
  const removeNonNumeric = (value: string) => {
    return value.replace(/[^0-9]/g, '')
  }

  createEffect(() => {
    setWireSize(getWireSize(current()))
  })

  const getWireSize = (current: string) => {
    const num = parseInt(current)
    if (!num) return ''
    if (num <= 11) return '0.5'
    if (num <= 15) return '0.75'
    if (num <= 17) return '1.00'
    if (num <= 23) return '1.50'
    if (num <= 26) return '2.00'
    if (num <= 30) return '2.50'
    if (num <= 41) return '4.00'
    return 'needs big wire'
  }

  const onReset = () => {
    setVoltage('')
    setCurrent('')
    setResistance('')
    setPower('')
  }

  const onFocus: any = (e: InputEvent) => {
    const target = e.currentTarget as HTMLInputElement
    setActiveField(target.id)
  }

  const addTargetToLastEditedValues: any = (e: InputEvent) => {
    const target = e.currentTarget as HTMLInputElement

    if (lastEditedFields().includes(target.id)) {
      return
    }

    let newActiveInputs = lastEditedFields()
    newActiveInputs.push(target.id)

    setLastEditedFields(newActiveInputs.slice(-2))

    console.log(lastEditedFields())
  }

  const onChange: any = (e: InputEvent) => {
    const target = e.currentTarget as HTMLInputElement
    const valueNumsOnly = removeNonNumeric(target.value)

    addTargetToLastEditedValues(e)

    switch (target.id) {
      case 'voltage':
        setVoltage(valueNumsOnly)
        break
      case 'current':
        setCurrent(valueNumsOnly)
        break
      case 'resistance':
        setResistance(valueNumsOnly)
        break
      case 'power':
        setPower(valueNumsOnly)
        break
      default:
        console.log('no handler registered for field')
    }

    calculateAllValues()
  }

  const calculateAllValues = () => {
    const voltageAndCurrent = ['voltage', 'current']
    const voltageAndPower = ['voltage', 'power']
    const currentAndResistance = ['current', 'resistance']
    const powerAndCurrent = ['power', 'current']

    if (
      voltageAndCurrent.every((value) => {
        return lastEditedFields().includes(value)
      })
    ) {
      calcPower()
      calcResistance()
    }

    if (
      voltageAndPower.every((value) => {
        return lastEditedFields().includes(value)
      })
    ) {
      calcCurrent()
      calcResistance()
    }

    if (
      currentAndResistance.every((value) => {
        return lastEditedFields().includes(value)
      })
    ) {
      calcVoltage()
      calcPower()
    }

    if (
      powerAndCurrent.every((value) => {
        return lastEditedFields().includes(value)
      })
    ) {
      calcVoltage()
      calcResistance()
    }
  }

  const calcResistance = () => {
    if (voltage() && current() && activeField() != 'resistance') {
      setResistance(evaluate(`${voltage()} / ${current()}`))
    }
  }

  const calcPower = () => {
    if (voltage() && current() && activeField() != 'power') {
      setPower(evaluate(`${voltage()} * ${current()}`))
    }
  }

  const calcCurrent = () => {
    if (voltage() && power() && activeField() != 'current') {
      setCurrent(evaluate(`${power()} / ${voltage()}`))
    }
  }

  const calcVoltage = () => {
    if (resistance() && current() && activeField() != 'voltage') {
      setVoltage(evaluate(`${resistance()} * ${current()}`))
    }
  }

  const leftSectionElements = () => {
    return [
      <TextField
        disabled
        id="wireSize"
        label="Wire cross section"
        helperText="mm2"
        value={wireSize()}
        defaultValue=""
      />,
      <Button variant="outlined" onClick={onReset} size="small" color="error">
        Reset
      </Button>,
    ]
  }

  const centerSectionElements = () => {
    return [
      <TextField
        id="voltage"
        label="V"
        helperText="Volts"
        onChange={onChange}
        onFocus={onFocus}
        value={voltage().toString()}
      />,
      <TextField
        id="current"
        label="I"
        helperText="Amps"
        onChange={onChange}
        onFocus={onFocus}
        value={current().toString()}
      />,
      <TextField
        id="resistance"
        label="R"
        helperText="Ohms"
        onChange={onChange}
        onFocus={onFocus}
        value={resistance().toString()}
      />,
      <TextField
        id="power"
        label="P"
        helperText="Watts"
        onChange={onChange}
        onFocus={onFocus}
        value={power().toString()}
      />,
    ]
  }

  const rightSectionElements = () => {
    const formulas = ['V = I x R', 'I = V ÷ R', 'R = V ÷ I', 'P = V x I']
    const formulasJSX: JSX.Element[] = formulas.map((formula) => (
      <div>{formula}</div>
    ))
    return formulasJSX
  }

  return (
    <Page
      leftSectionElements={leftSectionElements()}
      centerSectionElements={centerSectionElements()}
      rightSectionElements={rightSectionElements()}
    />
  )
}

export default OhmsLaw
