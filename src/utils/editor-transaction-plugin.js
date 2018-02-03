import { Hashtag, Mention, Price } from 'component/editor/transaction'
import { findWithRegex } from 'utils/editor-utils'
import regexes from 'utils/regexes'

export default {
  decorators: [
    {
      strategy(contentBlock, callback, contentState) {
        findWithRegex(regexes.price, contentBlock, callback)
      },
      component: Price,
    },
    {
      strategy(contentBlock, callback, contentState) {
        findWithRegex(regexes.priceDebt, contentBlock, callback)
      },
      component: Price,
    },
    {
      strategy(contentBlock, callback, contentState) {
        findWithRegex(regexes.hashtag, contentBlock, callback)
      },
      component: Hashtag,
    },
    {
      strategy(contentBlock, callback, contentState) {
        findWithRegex(regexes.mention, contentBlock, callback)
      },
      component: Mention,
    },
  ],
}
