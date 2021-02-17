import React from 'react';

import { render, act, fireEvent } from "../test-utils";
import ImageModal from "../../components/ImageModal";

describe("ImageModal", () => {
    let expectedProps, closeHandler

    beforeEach(() => {
        closeHandler = jest.fn();

        expectedProps = {
            open: true,
            onCloseModal: closeHandler,
            imageUrl: "https://via.placeholder.com/150"
        }
    })

    test('should be able to close the modal', async () => {
        closeHandler.mockImplementation(()=>{
            expectedProps.open = false
        })
        const { getByRole } = render(<ImageModal {...expectedProps} />);
        const button = getByRole("button");

        fireEvent.click(button)
        expect(button).toBeVisible()
        expect(expectedProps.open).toBeFalsy()
    })
});