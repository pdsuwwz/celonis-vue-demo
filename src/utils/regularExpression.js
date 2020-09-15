const regexLatAndLng = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
const regexExtraSpace = /\s+/g
const regexExtraSlash = /\/\/+/g
const regexExtraColon = /(?<=:)\w+/g

export {
  regexLatAndLng,
  regexExtraSpace,
  regexExtraSlash,
  regexExtraColon
}
