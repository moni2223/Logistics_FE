import { forwardRef, useRef, useEffect } from "react"
import "./styles.scss"

const Checkbox = forwardRef(function Checkbox({ row, indeterminate, isHidden, ...rest }, ref) {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <>
            <input
                className={`${isHidden && 'hidden'}`}
                type="checkbox"
                name={row}
                id={row}
                ref={resolvedRef}
                {...rest}
            />
            <label htmlFor={row}>
                <div className="check-box-image-container">
                    <div className="check-box-image">
                        <div className="check-box-image-check" />
                    </div>
                </div>
            </label>
        </>
    )
})

export default Checkbox