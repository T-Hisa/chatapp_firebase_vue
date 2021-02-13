const messages = {
  en: {
    top: {
      sign_out: 'SignOut',
      edit_profile: 'Set Profile',
      sign_up: 'SignUp',
      sign_in: 'SignIn'
    },
    sidebar: {
      direct: 'Direct Message',
      group: 'Group',
      notify: 'Notification',
      create_group: 'Create Group'
    },
    sign: {
      sign_up: 'Register',
      e_mail: 'Email',
      password: 'password',
      begging_email: '※Please enter Email',
      begging_correct_email: '※Please enter Email correctly',
      begging_correct_password: '※Please enter password within 6 words',
      already_registered_email: 'This Email is already registered',
      sign_in: 'SignIn',
      cant_sign_in: "can't SignIn"
    },
    notify: {
      no_notification: 'No Notification',
      directchat_notify: 'chat from Mr.{name}',
      groupchat_notify: "chat in group '{name}'",
      entry_group_notify: "enter the group '{name}'",
      leave_group_notify: "leave the group '{name}'",
      delete_group_notify: "delte the group {name}'",
      happening_error: 'An unexpected error was happend. Please contact us.'
    },
    groups: {
      select_group: 'Group Select',
      search_group: 'Search Group',
      no_belonging_group: 'No belonging group',
      no_search_hit_group: 'No group was hit with search',
      already_group_deleted: "The group '{groupName} was already deleted'",
      group_name: 'groupname',
      member_list: 'memberlist',
      edit: 'Edit',
      delete: 'Delete',
      confirm_delete: "Now we're deleting the group '{groupName}'. OK?",
      begging_group_name: 'Please enter group name.'
    },
    confirm: {
      sent_mail_for_authentication: 'Send a Email for registered Email Adress',
      begging_reregister: 'If you register wrong email, please reregister.',
      mail_caution: '※ In that case, you cannot register with the same email address.',
      resend_mail: 'Resend Email',
      action_reregister: 'Reregister',
      begging_click: 'When email confirmed, Click here! (reload)'
    },
    chat: {
      user: 'User:',
      group: 'Group:',
      member: 'Member',
      submit: 'Send'
    },
    select_user: {
      select_user: 'Select User',
      search_user: 'Search User',
      direct_message: 'Direct Message',
      user_info: 'User Information',
      no_search_hit_user: 'There is no user with search parameter',
      no_user: 'There is no user'
    },
    profile: {
      set_profile: 'Setting Profile',
      name: 'Name',
      set_thumbnail: 'Setting Thumbnail',
      caution_default_thumbnail: "（※If you did't set thumbnail, following image will be set）",
      cancel: 'Cancel'
    },
    utils: {
      thumbnail: 'Thumbnail'
    }
  },
  ja: {
    top: {
      sign_out: 'ログアウト',
      edit_profile: 'プロフィール変更',
      sign_up: '登録',
      sign_in: 'ログイン'
    },
    sidebar: {
      direct: '個人チャット',
      group: 'グループ',
      notify: '通知',
      create_group: 'グループ作成'
    },
    sign: {
      sign_up: '登録',
      e_mail: 'Eメール',
      password: 'パスワード',
      begging_email: '※Eメールを入力してください',
      begging_correct_email: '※Eメールを正しい形式で入力してください',
      begging_correct_password: '※パスワードは6文字以内で入力してください',
      already_registered_email: 'このメールアドレスは既に登録されています',
      sign_in: 'ログイン',
      cant_sign_in: 'ログインできませんでした'
    },
    notify: {
      no_notification: '通知はありません。',
      directchat_notify: '{name} さんからチャットが届いています',
      groupchat_notify: '{name}でチャットがありました',
      entry_group_notify: '{name}のグループに参加しました',
      leave_group_notify: '{name} のグループから退出しました',
      delete_group_notify: '{name} のグループが削除されました',
      happening_error: '予期せぬエラーです。ご一報ください。'
    },
    groups: {
      select_group: 'グループ選択',
      search_group: 'グループ検索',
      no_belonging_group: '所属しているグループはありません',
      no_search_hit_group: '検索にヒットしたグループはありません',
      already_group_deleted: 'グループ『{groupName}』は削除されてます。',
      group_name: 'グループ名',
      member_list: 'メンバーリスト',
      edit: '編集',
      delete: '削除',
      confirm_delete: '対象のグループ『{groupName}』を削除します。よろしいですか？',
      begging_group_name: 'グループ名を入力してください'
    },
    confirm: {
      sent_mail_for_authentication: '入力されたメールアドレスに認証用URLを送信しました。',
      begging_reregister: 'メールアドレスを誤って登録した場合は、お手数をおかけしますが再登録をお願いします。',
      mail_caution: '※ その際は同じメールアドレスでは登録できません。',
      resend_mail: 'メール再送信',
      action_reregister: '再登録する',
      begging_click: '確認したらここをクリック（更新）'
    },
    chat: {
      user: 'ユーザー:',
      group: 'グループ:',
      member: 'メンバー',
      submit: '送信'
    },
    select_user: {
      select_user: 'ユーザー選択',
      search_user: 'ユーザー検索',
      direct_message: 'ダイレクトメッセージ',
      user_info: 'ユーザー情報',
      no_search_hit_user: '検索にヒットしたユーザーはいません。',
      no_user: 'ユーザーがいません'
    },
    profile: {
      set_profile: 'プロフィール設定',
      name: '名前',
      set_thumbnail: 'サムネイル設定',
      caution_default_thumbnail: '（※設定しない場合は下のデフォルトのものになります。）',
      cancel: '取り消し'
    },
    utils: {
      thumbnail: 'サムネイル'
    }
  }
}

export default messages
