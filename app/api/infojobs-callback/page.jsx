"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function InfoJobsCallback() {
  const router = useRouter()
  const { code } = router.query || {} // Obtiene el código de verificación de los parámetros de consulta
  console.log(code)

  useEffect(() => {
    // Verifica si el código de verificación está presente antes de realizar el redireccionamiento
    if (code) {
      // Realiza cualquier procesamiento adicional necesario con el código de verificación
      // Por ejemplo, puedes almacenar el código de verificación en una variable de estado o en una cookie

      // Redirecciona al usuario a una página para solicitar el token de acceso
      router.push(`/request-token?code=${code}`)
    }
  }, [code, router])

  return null // Opcionalmente, puedes mostrar una página de carga o un mensaje de redirección
}
