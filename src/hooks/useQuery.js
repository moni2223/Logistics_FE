import { useLocation, useNavigate } from 'react-router-dom'

export const useQuery = (initial) => {
    const navigate = useNavigate()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const handleUrlChange = (newValues = {}) => {
        Object.entries(newValues).forEach(([key, value]) => {
            if (!value) query.delete(key)
            else if (query.has(key)) query.set(key, value)
            else query.append(key, value)
        })
        navigate({ ...location, search: '?' + query.toString() }, { replace: true })
    }

    const initQuery = (acceptedValues) => {
        const payload = Object.keys(acceptedValues || {}).filter((key) => {
            if (!acceptedValues[key]) return false
            const value = query.get(key)
            if (value && acceptedValues[key].map((option) => option?.value).includes(value)) return false
            return true
        }).reduce((acc, cur) => ({ ...acc, [cur]: acceptedValues[cur][0].value }), {})
        setTimeout(() => handleUrlChange(payload), 0)
    }

    const clear = () => {
        Array.from(query.keys()).forEach((key) => query.delete(key))
        navigate({ ...location, search: '?' + query.toString() }, { replace: true })
    }

    initial && initQuery(initial)

    return {
        ...Array.from(query.keys()).reduce((a, key) => ({ ...a, [key]: query.get(key) }), {}),
        handleUrlChange,
        initQuery,
        clear,
    }
}
