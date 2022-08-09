import TextField from '@suid/material/TextField'
import Button from '@suid/material/Button'
import Divider from '@suid/material/Divider'

import styles from './styles.module.css'
import { Component, createSignal, JSX } from 'solid-js'
import { evaluate } from 'mathjs'
import OhmsLawChart from '../../components/ohmsLawChart'

const [voltage, setVoltage] = createSignal('')
const [current, setCurrent] = createSignal('')
const [resistance, setResistance] = createSignal('')
const [power, setPower] = createSignal('')
const [lastEditedFields, setLastEditedFields] = createSignal(['', ''])
const [activeField, setActiveField] = createSignal('')

const ohmsLaw: Component = () => {
  const removeNonNumeric = (value: string) => {
    return value.replace(/[^0-9]/g, '')
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
    console.log('active field: ' + activeField())
  }

  const addTargetToLastEditedValues: any = (e: InputEvent) => {
    const target = e.currentTarget as HTMLInputElement

    if (lastEditedFields().includes(target.id)) {
      console.log(lastEditedFields())
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

  return (
    <div class={styles.page}>
      <div class={styles.notes}>
        <TextField
          disabled
          id="wireSize"
          label="Wire cross section"
          defaultValue=""
        />
        <Button variant="outlined" onClick={onReset} size="small" color="error">
          Reset
        </Button>
      </div>
      <Divider orientation="vertical" flexItem />
      <div class={styles.form}>
        <TextField
          id="voltage"
          label="V"
          helperText="Volts"
          onChange={onChange}
          onFocus={onFocus}
          value={voltage().toString()}
        />
        <TextField
          id="current"
          label="I"
          helperText="Amps"
          onChange={onChange}
          onFocus={onFocus}
          value={current().toString()}
        />
        <TextField
          id="resistance"
          label="R"
          helperText="Ohms"
          onChange={onChange}
          onFocus={onFocus}
          value={resistance().toString()}
        />
        <TextField
          id="power"
          label="P"
          helperText="Watts"
          onChange={onChange}
          onFocus={onFocus}
          value={power().toString()}
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <div class={styles.illustration}>
        <OhmsLawChart />
      </div>
    </div>
  )
}

export default ohmsLaw
