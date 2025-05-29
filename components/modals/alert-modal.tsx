"use client"

import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title='Вы уверены?'
      description='Это действие нельзя будет отменить.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='pt-6 space-x-2 flex items-center justify-end w-full '>
        <Button disabled={loading} variant='outline' onClick={onClose}
        className={`
            bg-green-200 
              transition-all duration-300
            hover:bg-green-400
            focus:bg-green-400
            hover:translate-y-1
            focus:translate-y-1
          `}
        >
          Отменить
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}
         className={`
          bg-red-300 
            transition-all duration-300
          hover:bg-red-500
          focus:bg-red-500
          hover:translate-y-1
          focus:translate-y-1
        `}
        >
          Продолжить
        </Button>
      </div>
    </Modal>
  )
}
