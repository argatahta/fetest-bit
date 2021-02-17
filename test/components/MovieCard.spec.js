import React from 'react';

import { render, act, fireEvent } from "../test-utils";
import MovieCard from "../../components/MovieCard";

describe("MovieCard", ()=> {
    let expectedProps, handleClick

    beforeEach(()=> {
        handleClick = jest.fn();
        expectedProps = {
            imageUrl : 'https://via.placeholder.com/150',
            title: "Batman",
            years: "2006",
            onImageClick: handleClick,
            onMovieClick: handleClick
        }
    });

    test('should render title and image', () => {
        const { getByText, getByAltText }  = render(<MovieCard {...expectedProps} />);
        const title = getByText(`${expectedProps.title} (${expectedProps.years})`);
        const image = getByAltText(expectedProps.title);

        expect(title).toBeVisible();
        expect(image).toBeVisible();
        expect(image.src).toContain(expectedProps.imageUrl);
    });

    test('should be able to click the image', async () => {
        const { getByAltText }  = render(<MovieCard {...expectedProps} />);
        const image = getByAltText(expectedProps.title);

        fireEvent.click(image);

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('should be able to click the title', () => {
        const { getByText }  = render(<MovieCard {...expectedProps} />);
        const title = getByText(`${expectedProps.title} (${expectedProps.years})`);

        fireEvent.click(title);

        expect(handleClick).toHaveBeenCalledTimes(1)
    })
});