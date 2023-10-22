import * as LitJsSdk from '@lit-protocol/lit-node-client'
import { use, useCallback, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

// const rocketPoolValidatorAccessControl = [
//   {
//     contractAddress: '0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11',
//     standardContractType: 'ERC20',
//     chain: 'ethereum',
//     method: 'balanceOf',
//     parameters: [
//       ':userAddress'
//     ],
//     returnValueTest: {
//       comparator: '>=',
//       value: '400'
//     }
//   }
// ]

const getTokenAccessControl = (contractAddress = '') =>
  [
    {
      contractAddress,
      standardContractType: 'ERC20',
      chain: 'ethereum',
      method: 'balanceOf',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '>=',
        value: '1'
      }
    },
    { operator: 'and' },
    {
      contractAddress: '',
      standardContractType: 'SIWE',
      chain: 'ethereum',
      method: '',
      parameters: [':domain'],
      returnValueTest: {
        comparator: '=',
        value: 'localhost:3000'
      }
    }
  ] as any[]

export const useTokenGate = ({ token = '' }) => {
  const accessControlConditions = getTokenAccessControl(token)
  const [isConnected, setIsConnected] = useState(false)
  const [_isNotMember, setIsNotMember] = useState<boolean>()

  const connect = useCallback(async () => {
    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false
      // debug: false
    })
    await client.connect()
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: 'ethereum'
    })

    const resourceId = {
      baseUrl: 'http://localhost:3000',
      path: '/',
      orgId: '',
      role: '',
      extraData: authSig.address
    }

    try {
      const jwt = await client.getSignedToken({
        accessControlConditions,
        chain: 'ethereum',
        authSig,
        resourceId
      })
      Cookies.set('lit-auth', jwt, { expires: 1 })
      setIsConnected(true)
      setIsNotMember(false)
    } catch (error: any) {
      const errorCode = error?.errorCode as string
      console.log({ errorCode })
      const accessDenied =
        errorCode === 'NodeAccessControlConditionsReturnedNotAuthorized'
      setIsNotMember(accessDenied)
      setIsConnected(accessDenied)
    }
  }, [accessControlConditions])

  return {
    connect,
    isConnected,
    isNotMember: _isNotMember !== undefined && _isNotMember === true
  }
}

const DIVA_TOKEN = '0xbfabde619ed5c4311811cf422562709710db587d'

export const useDivaGate = () => {
  return useTokenGate({
    token: DIVA_TOKEN
  })
}
