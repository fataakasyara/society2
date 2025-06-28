import React, { createContext, useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const MetaMaskContext = createContext()

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext)
  if (!context) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider')
  }
  return context
}

export const MetaMaskProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null)
  const [provider, setProvider] = useState(null)

  // Function to truncate Ethereum address
  const truncateAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Initialize MetaMask connection
  useEffect(() => {
    const initMetaMask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        setProvider(window.ethereum)
        
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            handleAccountsChanged(accounts)
          }
        } catch (error) {
          console.error('Error checking existing connection:', error)
        }

        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged)
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          window.location.reload()
        })
      }
    }

    initMetaMask()

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setIsConnected(false)
      setCurrentAccount(null)
    } else {
      setIsConnected(true)
      setCurrentAccount(accounts[0])
    }
  }

  // Connect to MetaMask
  const connect = async () => {
    if (!window.ethereum) {
      showAlert('MetaMask wallet not detected. Please install MetaMask extension to connect your wallet and access Web3 features.', 'warning')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        handleAccountsChanged(accounts)
        showAlert('🎉 Successfully connected to MetaMask! Your wallet is now linked to Nolyx Society.', 'success')
      }
    } catch (error) {
      console.error('Connection error:', error)

      if (error.code === 4001) {
        showAlert('Connection request was rejected. Please try again and approve the connection to continue.', 'info')
      } else if (error.code === -32002) {
        showAlert('Connection request is already pending. Please check your MetaMask extension.', 'info')
      } else {
        showAlert('Failed to connect to MetaMask. Please make sure your wallet is unlocked and try again.', 'error')
      }
    }
  }

  // Disconnect from MetaMask
  const disconnect = async () => {
    setIsConnected(false)
    setCurrentAccount(null)
    showAlert('👋 Successfully disconnected from MetaMask. Your wallet is no longer connected to this site.', 'info')
  }

  // Show alert messages
  const showAlert = (message, type = 'info') => {
    const config = {
      title: getAlertTitle(type),
      text: message,
      icon: type,
      timer: 4000,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#10b981',
      toast: false,
      position: 'center',
      backdrop: true,
      allowOutsideClick: true,
      allowEscapeKey: true
    }

    Swal.fire(config)
  }

  // Get alert title based on type
  const getAlertTitle = (type) => {
    const titles = {
      success: 'Success!',
      error: 'Error!',
      warning: 'Warning!',
      info: 'Info'
    }
    return titles[type] || 'Notification'
  }

  // Get current connection status
  const getConnectionStatus = () => {
    return {
      isConnected,
      account: currentAccount,
      truncatedAccount: currentAccount ? truncateAddress(currentAccount) : null
    }
  }

  // Get network information
  const getNetworkInfo = async () => {
    if (!provider) return null

    try {
      const chainId = await provider.request({ method: 'eth_chainId' })
      return {
        chainId: chainId,
        chainIdDecimal: parseInt(chainId, 16)
      }
    } catch (error) {
      console.error('Error getting network info:', error)
      return null
    }
  }

  // Get balance
  const getBalance = async () => {
    if (!provider || !currentAccount) return null

    try {
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [currentAccount, 'latest']
      })

      const balanceInEther = parseInt(balance, 16) / Math.pow(10, 18)
      return balanceInEther.toFixed(4)
    } catch (error) {
      console.error('Error getting balance:', error)
      return null
    }
  }

  const value = {
    isConnected,
    currentAccount,
    provider,
    connect,
    disconnect,
    getConnectionStatus,
    getNetworkInfo,
    getBalance,
    truncateAddress
  }

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  )
}