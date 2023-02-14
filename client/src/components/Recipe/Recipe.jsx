import style from "./Recipe.module.css"

const Recipe = (props) => {
    return (
        <div className={style.recipe}>
            <p>
            name: {props.title}
            </p>
            <p>
            summary: {props.summary}
            </p>
        </div>
    )
    }
export default Recipe