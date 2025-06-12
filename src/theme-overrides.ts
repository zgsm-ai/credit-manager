import { type GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
    Checkbox: {
        colorChecked: '#000',
        borderChecked: '1px solid rgba(255, 255, 255, 0.2)',
        borderFocus: 'rgba(255, 255, 255, 0.2)',
        boxShadowFocus: '#fff',
    },
    Input: {
        color: '#000',
        borderHover: '1px solid rgba(255, 255, 255, 0.2)',
        borderFocus: '1px solid rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        placeholderColor: 'rgba(255, 255, 255, 0.5)',
        colorFocus: '#000',
        textColor: '#fff',
        caretColor: '#fff',
        colorFocusError: '#000',
        colorDisabled: 'rgba(255, 255, 255, 0.2)',
        borderDisabled: '1px solid rgba(255, 255, 255, 0.2)',
        fontSizeMedium: '12px',
    },
    Button: {
        color: 'rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderHover: '1px solid rgba(255, 255, 255, 0.2)',
        textColor: '#fff',
        textColorHover: '#fff',
    },
    Collapse: {
        titleTextColor: '#fff',
        arrowColor: 'rgba(255, 255, 255, 0.7)',
        titleFontSize: '16px',
    },
    Form: {
        feedbackFontSizeMedium: '12px',
        labelTextColor: '#fff',
        labelFontSizeTopMedium: '12px',
    },
    DataTable: {
        fontSizeSmall: '12px',
        tdColor: '#000',
        thColor: '#000',
        tdTextColor: '#fff',
        thTextColor: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        tdColorHover: '',
        borderColorModal: 'rgba(255, 255, 255, 0.2)',
        thColorModal: '#000',
        tdColorModal: '#000',
        tdColorHoverModal: '',
    },
    InputNumber: {
        peers: {
            Input: {
                fontSizeSmall: '12px',
            },
        },
    },
    Popover: {
        fontSize: '12px',
        color: '#000',
        textColor: '#fff',
    },
    Modal: {
        peers: {
            Card: {
                colorModal: '#000',
                color: '#fff',
                titleTextColor: '#fff',
                titleFontWeight: '600',
                borderRadius: '6px',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                actionColor: '#000',
            },
        },
    },
    Card: {
        color: '#000',
    },
    Spin: {
        color: '#1876F2'
    }
}
