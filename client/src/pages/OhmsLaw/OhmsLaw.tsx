import TextField from '@suid/material/TextField'
import Button from '@suid/material/Button'

import { Component, createEffect, createSignal, JSX } from 'solid-js'

import Page from '../../components/Page'

const [voltage, setVoltage] = createSignal(0)
const [current, setCurrent] = createSignal(0)
const [resistance, setResistance] = createSignal(0)
const [power, setPower] = createSignal(0)
const [wireSize, setWireSize] = createSignal('')
const [lastEditedFields, setLastEditedFields] = createSignal(['', ''])
const [activeField, setActiveField] = createSignal('')

const OhmsLaw: Component = () => {
  const numerify = (value: string): number => {
    return parseInt(value.replace(/[^0-9]/g, ''))
  }

  createEffect(() => {
    setWireSize(getWireSize(current()))
  })

  const getWireSize = (current: number) => {
    if (!current) return ''
    if (current <= 11) return '0.5'
    if (current <= 15) return '0.75'
    if (current <= 17) return '1.00'
    if (current <= 23) return '1.50'
    if (current <= 26) return '2.00'
    if (current <= 30) return '2.50'
    if (current <= 41) return '4.00'
    return 'needs big wire'
  }

  const getFieldValue = (num: number): string => {
    if (num == 0) return ''
    else return num.toString()
  }

  const onReset = () => {
    setVoltage(0)
    setCurrent(0)
    setResistance(0)
    setPower(0)
  }

  const onFocus: any = (e: InputEvent) => {
    const target = e.currentTarget as HTMLInputElement
    setActiveField(target.id)
  }

  const addToLastEditedFields: any = (id: string) => {
    if (lastEditedFields().includes(id)) {
      return
    }

    let newActiveInputs = lastEditedFields()
    newActiveInputs.push(id)

    setLastEditedFields(newActiveInputs.slice(-2))

    console.log(lastEditedFields())
  }

  const onChange: any = (e: InputEvent) => {
    const target = e.currentTarget as HTMLInputElement
    const newValue = numerify(target.value)

    addToLastEditedFields(target.id)

    switch (target.id) {
      case 'voltage':
        setVoltage(newValue)
        break
      case 'current':
        setCurrent(newValue)
        break
      case 'resistance':
        setResistance(newValue)
        break
      case 'power':
        setPower(newValue)
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
      setResistance(voltage() / current())
    }
  }

  const calcPower = () => {
    if (voltage() && current() && activeField() != 'power') {
      setPower(voltage() * current())
    }
  }

  const calcCurrent = () => {
    if (voltage() && power() && activeField() != 'current') {
      setCurrent(power() / voltage())
    }
  }

  const calcVoltage = () => {
    if (resistance() && current() && activeField() != 'voltage') {
      setVoltage(resistance() * current())
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
        value={getFieldValue(voltage())}
      />,
      <TextField
        id="current"
        label="I"
        helperText="Amps"
        onChange={onChange}
        onFocus={onFocus}
        value={getFieldValue(current())}
      />,
      <TextField
        id="resistance"
        label="R"
        helperText="Ohms"
        onChange={onChange}
        onFocus={onFocus}
        value={getFieldValue(resistance())}
      />,
      <TextField
        id="power"
        label="P"
        helperText="Watts"
        onChange={onChange}
        onFocus={onFocus}
        value={getFieldValue(power())}
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
