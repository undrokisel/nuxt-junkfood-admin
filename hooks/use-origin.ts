import { useEffect, useState } from "react"

/**
 * Этот хук нужен, чтобы:
  Безопасно получить window.location.origin
  Избежать ошибок при SSR (рендеринге на сервере) в Next.js
  Получить актуальный адрес сайта , который можно использовать для:
    CORS
    API-запросов
    Генерации абсолютных ссылок
    Проверки окружения (production / dev)
 * @returns 
 * 
 */
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)

    const origin =
        typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";
    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) return ""
    return origin;
}