import React from "react";
import { Text as RNText } from "react-native";
import { typography, colors } from "@/theme";

/**
 * @param {import('react-native').TextProps & {
 *  style?: import('react-native').StyleProp<import('react-native').TextStyle>
 * }} props
 */
export default function Text({ style, ...props }) {
  return (
    <RNText
      style={[
        {
          fontFamily: typography.fontFamily.regular,
          color: colors.primaryDark,
        },
        style,
      ]}
      {...props}
    />
  );
}
