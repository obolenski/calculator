import { Component, For, JSX } from 'solid-js'

interface IPageSectionProps {
  components?: JSX.Element[]
  class: any
}

const PageSection: Component<IPageSectionProps> = (props) => {
  return (
    <div class={props.class}>
      <For each={props.components}>{(component) => <div>{component}</div>}</For>
    </div>
  )
}

export default PageSection
