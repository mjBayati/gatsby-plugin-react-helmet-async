import { GatsbySSR, RenderBodyArgs, WrapRootElementNodeArgs } from 'gatsby'
import React from 'react'
import { HelmetData, HelmetProvider } from 'react-helmet-async'

const context: { helmet?: HelmetData } = {}

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
}: RenderBodyArgs): any => {
  const { helmet } = context

  if (helmet != null) {
    setHeadComponents([
      helmet.base.toComponent(),
      helmet.title.toComponent(),
      helmet.priority.toComponent(),
      helmet.meta.toComponent(),
      helmet.link.toComponent(),
      helmet.style.toComponent(),
      helmet.script.toComponent(),
      helmet.noscript.toComponent(),
    ])
    setHtmlAttributes(helmet.htmlAttributes.toComponent())
    setBodyAttributes(helmet.bodyAttributes.toComponent())
  }
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = (
  { element }: WrapRootElementNodeArgs,
): any => (
  <HelmetProvider context={context}>{element}</HelmetProvider>
)
