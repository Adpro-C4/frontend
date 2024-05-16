import React from "react"

export type CategoryCardProps = {
    imageUrl: string,
    label: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({imageUrl, label})=>{
    return <div className="flex  flex-col items-center space-y-4">
        <img src={imageUrl} className="rounded-md w-12 h-12 object-contain" alt="" />
        <h1 className="text-black text-center text-sm ">{label}</h1>
    </div>
}

export default CategoryCard