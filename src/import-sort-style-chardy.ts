import { IStyle } from 'import-sort-style'

export const sortStyle: IStyle = (styleApi, baseFile) => {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isNodeModule,
    isInstalledModule,
    isRelativeModule,
    isScopedModule,
    moduleName,
    naturally,
    not,
    or,
    unicode,
  } = styleApi

  const baseFileOrDefault = baseFile || ''

  return [
    // import "foo" - no sorting, order may matter
    { match: and(hasNoMember, isAbsoluteModule) },

    // import "./foo" - no sorting, order may matter
    { match: and(hasNoMember, isRelativeModule) },

    // import … from "node-module"
    // import … from "module"
    {
      match: or(
        isNodeModule,
        and(isAbsoluteModule, isInstalledModule(baseFileOrDefault)),
        isScopedModule,
      ),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },

    // import … from "src/stuff"
    {
      match: and(isAbsoluteModule, not(isInstalledModule(baseFileOrDefault))),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },

    // import … from "../foo";
    // import … from "./foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
  ]
}
