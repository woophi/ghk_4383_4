import { globalStyle, style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const tag = style({
  borderRadius: '16px',
  backgroundColor: '#FFFFFFF0',
  display: 'flex',
  alignItems: 'center',
  color: '#030306E0',
  width: 'max-content',
  height: '32px',
  padding: '8px 12px',
  gap: '4px',
  margin: '24px 0',
});

const cornerImg = style({
  zIndex: -1,
  position: 'absolute',
  right: '-1rem',
  bottom: '-1rem',
});

const containerBox = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '12px',
  backgroundColor: '#FFFFFF',
  borderRadius: '16px 16px 0 0',
});

const box = style({
  padding: '12px 16px',
  borderRadius: '16px',
  backgroundColor: '#F2F3F5',
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
});

const row = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '8px',
});
const rowSmall = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
});

const calendar = style({});
globalStyle(`${calendar} > svg`, {
  width: '16px',
  height: '16px',
});

export const appSt = {
  bottomBtn,
  container,
  tag,
  cornerImg,
  containerBox,
  box,
  row,
  calendar,
  rowSmall,
};
