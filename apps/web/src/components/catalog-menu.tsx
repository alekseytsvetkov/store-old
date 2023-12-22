'use client';

import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { createStitches } from '@stitches/core';
import { cn } from '@store/ui/cn';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const { css, keyframes } = createStitches({
  theme: {},
});

export function CatalogMenu() {
  const { t } = useTranslation();

  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={mainListClass()}>
        <NavigationMenu.Item suppressHydrationWarning={true}>
          {isClient && <TriggerWithIndicator>{t('catalog')}</TriggerWithIndicator>}
          <NavigationMenu.Content className={cn(submenusContentClass().className, 'container')}>
            <NavigationMenu.Sub
              className={submenusRootClass()}
              orientation="vertical"
              defaultValue="steam"
            >
              <NavigationMenu.List className={mainListClass()}>
                <NavigationMenu.Item value="steam">
                  <NavigationMenu.Trigger className={submenusSubTriggerClass()}>
                    <Image
                      alt="dota2-logo"
                      width="24"
                      height="24"
                      src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/570/0bbb630d63262dd66d2fdd0f7d37e8661a410075.jpg"
                      className="mr-2"
                    />
                    <span>Steam</span>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content
                    className={submenusSubContentClass()}
                    style={{
                      gridTemplateColumns: '1.5fr 1fr',
                    }}
                  >
                    <LinkGroup
                      items={[
                        'Top Up',
                        'Accounts',
                        'Keys',
                        'Gifts',
                        'Services',
                        'Points',
                        'Offline activation',
                        'Region change',
                      ]}
                    />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item value="discord">
                  <NavigationMenu.Trigger className={submenusSubTriggerClass()}>
                    <Image
                      alt="dota2-logo"
                      width="24"
                      height="24"
                      src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/570/0bbb630d63262dd66d2fdd0f7d37e8661a410075.jpg"
                      className="mr-2"
                    />
                    <span>Discord</span>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content
                    className={submenusSubContentClass()}
                    style={{
                      gridTemplateColumns: '1.5fr 1fr',
                    }}
                  >
                    <LinkGroup
                      items={['Servers', 'Decoration Services', 'Nitro', 'Server boost']}
                    />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item value="dota2">
                  <NavigationMenu.Trigger className={submenusSubTriggerClass()}>
                    <Image
                      alt="dota2-logo"
                      width="24"
                      height="24"
                      src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/570/0bbb630d63262dd66d2fdd0f7d37e8661a410075.jpg"
                      className="mr-2"
                    />
                    <span>Dota 2</span>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content
                    className={submenusSubContentClass()}
                    style={{
                      gridTemplateColumns: '1fr 1fr',
                    }}
                  >
                    <LinkGroup
                      items={[
                        'Accounts',
                        'VHS Pool',
                        'Items',
                        'MMR Boosting',
                        'Calibration',
                        'LP Removal',
                        'Coaching Dota+',
                        'Services',
                        'Compendium',
                        'Other',
                      ]}
                    />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item value="Path of Exile">
                  <NavigationMenu.Trigger className={submenusSubTriggerClass()}>
                    <Image
                      alt="dota2-logo"
                      width="24"
                      height="24"
                      src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/570/0bbb630d63262dd66d2fdd0f7d37e8661a410075.jpg"
                      className="mr-2"
                    />
                    <span>Path of Exile</span>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content
                    className={submenusSubContentClass()}
                    style={{
                      gridTemplateColumns: '1.5fr 1fr',
                    }}
                  >
                    <LinkGroup
                      items={[
                        'Divine orbs',
                        'Exalted orbs',
                        'Chaos orbs',
                        'Other orbs',
                        'Accounts',
                        'Items',
                        'Boosting',
                        'Services',
                        'Builds',
                        'Twitch Drops',
                        'Other',
                      ]}
                    />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Indicator className={submenusSubIndicatorClass()} />
              </NavigationMenu.List>

              <NavigationMenu.Viewport className={submenusSubViewportClass()} />
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport
        className={submenusViewportClass()}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
      />
    </NavigationMenu.Root>
  );
}

const TriggerWithIndicator: React.FC<{ children?: React.ReactNode; disabled?: boolean }> = ({
  children,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu.Trigger
      className={cn(
        triggerClass().className,
        'hamburger rounded-lg p-4 duration-300 focus:outline-none ',
        isOpen ? 'is-active' : '',
      )}
      disabled={disabled}
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {children}
      <div className="ml-1">
        <span className="line mb-2" />
        <span className="line mt-2" />
      </div>
      <motion.div
        key={isOpen ? 'open' : 'close'}
        initial={{ opacity: 0 }}
        // Clicking on link closes the nav
        onClickCapture={() => setIsOpen(false)}
        animate={{ opacity: 1 }}
        className={`bg-background/80 left-0 top-[55px] z-10 flex h-full w-full flex-1 snap-y flex-col gap-5 justify-self-center border-b p-3 backdrop-blur-md md:mt-0 md:hidden md:pb-0 ${
          isOpen ? 'absolute block w-full' : 'hidden'
        }`}
      >
        {children}
      </motion.div>
    </NavigationMenu.Trigger>
  );
};

const LinkGroup: React.FC<{ items: string[]; bordered?: boolean }> = ({
  items,
  bordered = true,
}) => {
  return (
    <ul className={bordered ? borderdListClass() : listClass()}>
      {items.map((item, i) => (
        <li key={i}>
          <NavigationMenu.Link
            href="#example"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'hsl(var(--foreground))',
            }}
          >
            {item}
          </NavigationMenu.Link>
        </li>
      ))}
    </ul>
  );
};

const listStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  margin: 0,
  padding: 0,
  listStyle: 'none',
} as const;

const listClass = css(listStyles);

const borderdListClass = css({
  ...listStyles,
  backgroundColor: 'hsl(var(--secondary))',
  padding: 25,
  borderRadius: 4,
});

/* -----------------------------------------------------------------------------------------------*/

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

const enterFromRight = keyframes({
  from: { transform: 'translate3d(200px,0,0)', opacity: 0 },
  to: { transform: 'translate3d(0,0,0)', opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: 'translate3d(-200px,0,0)', opacity: 0 },
  to: { transform: 'translate3d(0,0,0)', opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: 'translate3d(0,0,0)', opacity: 1 },
  to: { transform: 'translate3d(200px,0,0)', opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: 'translate3d(0,0,0)', opacity: 1 },
  to: { transform: 'translate3d(-200px,0,0)', opacity: 0 },
});

/* -----------------------------------------------------------------------------------------------*/

const mainListClass = css({
  all: 'unset',
  listStyle: 'none',
  display: 'flex',
  zIndex: 9999,

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
  },
});

const itemStyles = {
  padding: '10px 16px',
  fontWeight: 'bold',
};

const triggerClass = css({
  ...itemStyles,
  display: 'flex',
  alignItems: 'center',
  border: 0,
  background: 'transparent',
  fontSize: 'inherit',
  gap: 4,

  '> svg': {
    transition: 'transform 200ms ease',
  },

  '&[data-state="open"] > svg': {
    transform: 'rotate(-180deg)',
  },
});

/* -----------------------------------------------------------------------------------------------*/

const submenusRootClass = css({
  display: 'grid',
  width: '100%',
  maxWidth: 800,
  gap: 20,

  "&[data-orientation='vertical']": {
    gridTemplateColumns: '0.3fr 1fr',
  },

  "&[data-orientation='horizontal']": {
    justifyItems: 'center',
    marginTop: -10,
  },
});

const submenusViewportClass = css({
  position: 'absolute',
  left: 0,
  top: '100%',
  borderTop: '1px solid hsl(var(--secondary))',
  borderBottom: '1px solid hsl(var(--secondary))',
  transformOrigin: 'top center',
  width: '100%',
  backgroundColor: 'hsl(var(--background))',
  height: 'var(--radix-navigation-menu-viewport-height)',
  transition: 'height 300ms ease',
  overflow: 'hidden',
  boxShadow: '0 50px 100px -20px rgba(50,50,93,0.1),0 30px 60px -30px rgba(0,0,0,0.2)',

  zIndex: 9999,

  '&[data-state="open"]': {
    animation: `${fadeIn} 250ms ease`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 250ms ease`,
  },
});

const submenusContentClass = css({
  display: 'flex',
  // justifyContent: 'center',
  // position: 'absolute',
  // top: 0,
  // left: 0,
  width: '100%',

  paddingTop: 16,
  paddingBottom: 16,

  '&[data-motion="from-start"]': {
    animation: `${enterFromLeft} 250ms ease`,
  },
  '&[data-motion="from-end"]': {
    animation: `${enterFromRight} 250ms ease`,
  },
  '&[data-motion="to-start"]': {
    animation: `${exitToLeft} 250ms ease`,
  },
  '&[data-motion="to-end"]': {
    animation: `${exitToRight} 250ms ease`,
  },
});

const submenusSubContentClass = css({
  display: 'grid',
  gap: 20,
  width: '100%',
  paddingLeft: 16,
  borderLeft: '1px solid hsl(var(--secondary))',
});

const submenusSubViewportClass = css({
  width: '100%',
});

const submenusSubTriggerClass = css({
  ...itemStyles,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  border: 0,
  background: 'transparent',
  fontSize: 'inherit',
  width: '100%',
  borderRadius: 4,

  '&[data-state="open"]': {
    backgroundColor: 'hsl(var(--secondary))',
  },
});

const submenusSubIndicatorClass = css({
  // backgroundColor: 'white',
  // borderRadius: 4,

  '&[data-orientation="vertical"]': {
    width: 3,
    transition: 'transform, height, 250ms ease',

    "[dir='ltr'] &": {
      right: 0,
    },
    "[dir='rtl'] &": {
      left: 0,
    },
  },

  '&[data-orientation="horizontal"]': {
    height: 3,
    bottom: 0,
    transition: 'transform, width, 250ms ease',
  },
});
