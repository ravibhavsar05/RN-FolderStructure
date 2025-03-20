export const componentTemplates = {
    button: {
        component: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles[variant],
                styles[size],
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, styles[\`\${variant}Text\`]]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    small: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    medium: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    large: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.white,
    },
    outlineText: {
        color: colors.primary,
    },
});`,
        test: `import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
    it('renders correctly', () => {
        const onPress = jest.fn();
        const { getByText } = render(
            <Button title="Test Button" onPress={onPress} />
        );
        expect(getByText('Test Button')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPress = jest.fn();
        const { getByText } = render(
            <Button title="Test Button" onPress={onPress} />
        );
        fireEvent.press(getByText('Test Button'));
        expect(onPress).toHaveBeenCalled();
    });
});`,
        styles: `import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    small: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    medium: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    large: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.white,
    },
    outlineText: {
        color: colors.primary,
    },
});`
    },
    card: {
        component: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card: React.FC<CardProps> = ({
    title,
    children,
    variant = 'elevated',
}) => {
    return (
        <View style={[styles.card, styles[variant]]}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: spacing.md,
        margin: spacing.sm,
    },
    elevated: {
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    outlined: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    filled: {
        backgroundColor: colors.primary,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: spacing.sm,
        color: colors.text,
    },
    content: {
        flex: 1,
    },
});`,
        test: `import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from './Card';

describe('Card', () => {
    it('renders correctly with title', () => {
        const { getByText } = render(
            <Card title="Test Card">
                <Text>Card Content</Text>
            </Card>
        );
        expect(getByText('Test Card')).toBeTruthy();
        expect(getByText('Card Content')).toBeTruthy();
    });

    it('renders correctly without title', () => {
        const { getByText } = render(
            <Card>
                <Text>Card Content</Text>
            </Card>
        );
        expect(getByText('Card Content')).toBeTruthy();
    });
});`,
        styles: `import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: spacing.md,
        margin: spacing.sm,
    },
    elevated: {
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    outlined: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    filled: {
        backgroundColor: colors.primary,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: spacing.sm,
        color: colors.text,
    },
    content: {
        flex: 1,
    },
});`
    }
}; 