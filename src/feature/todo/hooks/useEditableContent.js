import { useBoolean } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const setFocusOnContentEditable = (Box) => {
    const s = getSelection();
    const r = document.createRange();
    r.setStart(Box, 1);
    r.setEnd(Box, 1);
    s.removeAllRanges();
    s.addRange(r);
};


const useEditableContent = () => {
    const [isEditable, setIsEditable] = useBoolean();
    const [previousText, setPreviousText] = useState("");
    const contentRef = useRef(null);

    useEffect(() => {
        contentRef.current.contentEditable = isEditable;
        if (isEditable) setFocusOnContentEditable(contentRef.current);
    }, [isEditable]);

    const confirmEditedContent = () => {
        setPreviousText("");
        setIsEditable.off();
    }
    const cancelEditedContent = () => {
        contentRef.current.textContent = previousText;
        confirmEditedContent()
    }
    const onEdit = () => {
        const currentText = contentRef.current.textContent;
        setPreviousText(currentText);
        setIsEditable.on();
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter") confirmEditedContent();
        if (e.code === "Escape") cancelEditedContent();
    }
    return {
        isEditable,
        cancelEditedContent,
        editedText: () => contentRef.current?.textContent,
        onEdit,
        confirmEditedContent,
        editableProp: {
            ref: contentRef,
            // onKeydown: handleKeyDown,
            onBlur: () => setFocusOnContentEditable(contentRef.current)
        }
    }
}

export default useEditableContent