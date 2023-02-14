import Recipe from "../Recipe/Recipe"
import style from "./RecipeContainer.module.css"
import { useSelector } from "react-redux"

const RecipeContainer = () => {
    const results= useSelector(state=>state.recipes)
    return (
        <div className={style.recipeContainer} >
            
            {results.map((recipe) =>{
                return  <Recipe 
                summary = {recipe.summary} 
                title = {recipe.title}
                />
                    
            })}
          
        </div>
    )
    }
export default RecipeContainer