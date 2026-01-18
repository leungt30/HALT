import React from 'react';

interface CategoryHeaderProps {
    name: string;
    id: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ name, id }) => {
    return (
        <div id={id} className="category-header">
            <h2>{name}</h2>
        </div>
    );
};
