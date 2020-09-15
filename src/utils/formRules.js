import { regexExtraSpace } from '@/utils/regularExpression'

function validatorRules (validator, trigger = '') {
  const rule = {
    required: true, trigger, validator: ''
  }
  validator ? rule.validator = validator : delete rule.validator
  return rule
}
function requiredRules (trigger = 'blur', message = '不能为空') {
  return validatorRules((rule, value, callback) => {
    if (!value) {
      callback(new Error(message))
    } else if (Array.isArray(value)) {
      value.length === 0 ? callback(new Error(message)) : callback()
    } else if (!String(value).replace(new RegExp(regexExtraSpace), '')) {
      callback(new Error(message))
    } else {
      callback()
    }
  }, trigger)
}
function requiredRadioRules (trigger = 'change', message = '不能为空') {
  return validatorRules((rule, value, callback) => {
    if (['boolean', 'number'].includes(typeof value)) {
      callback()
    } else if (value === '' || !value.replace(new RegExp(regexExtraSpace), '')) {
      callback(new Error(message))
    }
  }, trigger)
}
function imageListRules (errMsg = '请上传全部图片') {
  const errSingle = '请选择一张图片'
  const validator = (rule, value, callback) => {
    if (!value) {
      callback(new Error(errSingle))
    } else if (Array.isArray(value) && value.some((img) => !img.url)) {
      value.length > 1 ? callback(new Error(errMsg)) : callback(new Error(errSingle))
    } else {
      callback()
    }
  }
  return validatorRules(validator)
}

export {
  requiredRules,
  validatorRules,
  imageListRules,
  requiredRadioRules
}
