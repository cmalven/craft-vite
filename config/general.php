<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */

return [
    '*' => [
        // FUZZY SEARCH
        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),

        // ASSETS
        'imageDriver'                        => getenv('IMAGE_DRIVER'),
        'defaultImageQuality'                => getenv('DEFAULT_IMAGE_QUALITY'),
        'maxUploadFileSize'                  => '4M',
        'extraFileKinds' => [
            'svg' => [
                'label' => 'SVG',
                'extensions' => ['svg'],
            ],
            'jpg' => [
                'label' => 'JPEG',
                'extensions' => ['jpg', 'jpeg'],
            ],
            'png' => [
                'label' => 'PNG',
                'extensions' => ['png'],
            ],
            'mp4' => [
                'label' => 'MP4',
                'extensions' => ['mp4'],
            ],
        ],

        // MISC
        'devMode'                            => filter_var(getenv('DEV_MODE'), FILTER_VALIDATE_BOOLEAN),
        'phpMaxMemoryLimit'                  => getenv('PHP_MAX_MEMORY_LIMIT'),
        'allowUpdates'                       => false,
        'allowAdminChanges'                  => false,
        'maxRevisions'                       => 15,

        // URLS
        'omitScriptNameInUrls'               => true,
        'cpTrigger'                          => getenv('CP_TRIGGER'),

        // CACHING
        'enableTemplateCaching'              => filter_var(getenv('ENABLE_TEMPLATE_CACHING'), FILTER_VALIDATE_BOOLEAN),
        'maxCachedCloudImageSize'            => 0,

        // SECURITY
        'securityKey'                        => getenv('SECURITY_KEY'),
        'cooldownDuration'                   => 'PT5M',
        'invalidLoginWindowDuration'         => 'PT1H',
        'sendPoweredByHeader'                => false,
    ],

    'dev' => [
        'allowUpdates'                       => true,
        'allowAdminChanges'                  => true,
    ],

    'staging' => [],

    'production' => [],
];
