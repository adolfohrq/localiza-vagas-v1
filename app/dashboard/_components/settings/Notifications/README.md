# Componentes de Notificações

Este diretório contém os componentes relacionados às configurações de notificações da plataforma.

## Estrutura

- `index.tsx` - Exporta o componente principal `NotificationsSettings`
- `EmailNotifications.tsx` - Componente para gerenciar notificações por e-mail
- `PushNotifications.tsx` - Componente para gerenciar notificações push
- `DeviceNotifications.tsx` - Componente para gerenciar notificações no dispositivo

## Uso

```tsx
import { NotificationsSettings } from "@/app/dashboard/_components/settings";

// Em seu componente
<NotificationsSettings />
```

Você também pode importar componentes individuais:

```tsx
import { EmailNotifications } from "@/app/dashboard/_components/settings/Notifications/EmailNotifications";

// Em seu componente
<EmailNotifications />
```

## Funcionalidades

- Interface de usuário para gerenciar diferentes tipos de notificações
- Feedback visual através de toasts quando as configurações são alteradas
- Organização em abas para diferentes tipos de notificações (e-mail, push, dispositivo)
- Design responsivo e acessível

## Personalização

Cada componente pode ser personalizado conforme necessário. Os componentes utilizam o sistema de design da aplicação, incluindo cards, switches, separadores e outros elementos de UI. 